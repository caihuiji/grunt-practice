/**
 *  @info: link detector
 *  @author: chriscai
 *  @date: 2013-12-31
 */

CKEDITOR.plugins.add('linkdetector', {
        version : 0.1,
        init: function (editor) {


            var reg =/(?:(?:(?:ftp|https?):\/\/)(?:[a-z0-9](?:[-_a-z0-9]*[-_a-z0-9])?\.)+(?:com|mobi|mil|arpa|pro|name|coop|asia|tel|int|xxx|museum|aero|travel|ltd|plc|me|net|edu|biz|gov|org|in(?:t|fo)|[a-z][a-z])(?:\.[a-z][a-z])?|(?:(?:ftp|https?):\/\/((?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.(?:2[0-4]\d|25[0-5]|[01]?\d{1,2}))))(?:\:(?:\d{1,5}))?(?:[\/?#](?:[\w-.'!~@(*)%=&#?;,|+:$\^\[\]{}])*)*/ig;
            var bookmarkId = 'ck-bookmark-cp',
                bookmarkNode = document.createElement('span'),
                timeId ;

            bookmarkNode.id = bookmarkId;

            editor.on('change', function () {
                var ck = this,
                    document = this.document.$;


                timeId = setTimeout(function (){
                    clearTimeout(timeId);
                    var html = document.body.innerHTML;
                    if(!reg.test(html)){
                        return ;
                    }
                    var startDate = new Date() -0;

                    html = html.replace(/(<a.+?>)|<\/a>/gi , '');

                    var selection = document.getSelection(),
                        selectionNode = selection.getRangeAt(0),
                        urlArray = analyseUrl(html);

                    selectionNode.insertNode(bookmarkNode);
                    var newHtml = document.body.innerHTML.replace(/(<a.+?>)|<\/a>/gi , ''),
                        bookmarkIndex = newHtml.indexOf(bookmarkNode.outerHTML),
                        bookmarkRange = {startPos : bookmarkIndex , endPos : bookmarkIndex + bookmarkNode.outerHTML.length , length : bookmarkNode.outerHTML.length};

                    if (attachBookmark(urlArray , bookmarkRange)){
                        document.body.innerHTML = replaceUrl(html , urlArray , true);
                    }else {
                        document.body.innerHTML = replaceUrl(html , urlArray , bookmarkRange);
                    }

                    var range = document.createRange();
                    var newBookMarkNode = document.getElementById("ck-bookmark-cp" );
                    if(newBookMarkNode){
                        range.selectNode(newBookMarkNode);
                        selection.removeAllRanges();
                        selection.addRange(range);
                        //$.dom.remove(bookmarkNode);
                        newBookMarkNode.remove();
                    }
                    console.log("spend time " + (new Date().getTime() - startDate));
                },500);
            }, editor, null, 300);

            function attachBookmark (urlArray , bookmarkRange){
                for(var i = 0 ; i < urlArray.length ; i++){
                    var urlObj = urlArray[i];
                    if(urlObj.startPos < bookmarkRange.startPos && urlObj.endPos + bookmarkRange.length  > bookmarkRange.endPos){
                        urlObj.inSelection = true;
                        urlObj.bookmarkRange  = bookmarkRange;
                        return true;
                    }
                }
                return false;
            }

            function analyseUrl (html){
                var urlArray = html.match(reg),
                    index = 0;

                while(reg.test(html)){
                    urlArray[index] = {
                        url : urlArray[index],
                        startPos : reg.lastIndex - urlArray[index].length ,
                        endPos : reg.lastIndex
                    }
                    ++index;
                }
                return urlArray;
            }


            function replaceUrl (html , urlArray , bookmarkRange){
                var newHtml = '';
                if(bookmarkRange === true){ // bookmarkRange 为 true ，代表光标在 url 中
                    for(var i = 0 ;i < urlArray.length ; i++){
                        var urlObj = urlArray[i];
                        newHtml+= html.substring( i === 0 ? 0 :  urlArray[i-1].endPos , urlObj.startPos );
                        if(urlObj.inSelection){
                            var bkUrl = urlObj.url.substring(0 , urlObj.bookmarkRange.startPos - urlObj.startPos) +
                                        bookmarkNode.outerHTML +
                                        urlObj.url.substring(urlObj.bookmarkRange.startPos - urlObj.startPos);
                            newHtml+= '<a  href="'+ urlObj.url +'">'+ bkUrl +'</a>';
                        }else {
                            newHtml+= '<a  href="'+ urlObj.url +'">'+ urlObj.url +'</a>';
                        }

                    }
                    newHtml+= html.substring(urlArray[urlArray.length-1].endPos);
                    return newHtml;
                }


                var bmkHtml = html.substring( 0 , bookmarkRange.startPos) + bookmarkNode.outerHTML + html.substring( bookmarkRange.startPos);

               for(var i = 0 ;i < urlArray.length ; i++){
                   var urlObj = urlArray[i];
                   if(urlObj.startPos < bookmarkRange.startPos){
                       newHtml+=bmkHtml.substring( i === 0 ? 0 :  urlArray[i-1].endPos , urlObj.startPos);
                   }else {
                       newHtml+=bmkHtml.substring( i === 0 ? 0 :  urlArray[i-1].endPos + bookmarkRange.length , urlObj.startPos + bookmarkRange.length);
                   }
                   newHtml+= '<a  href="'+ urlObj.url +'">'+ urlObj.url +'</a>';
               }

                if(urlArray[urlArray.length -1].startPos <  bookmarkRange.startPos){
                    newHtml+= bmkHtml.substring(urlArray[urlArray.length-1].endPos);
                }else {
                    newHtml+= bmkHtml.substring(urlArray[urlArray.length-1].endPos +bookmarkRange.length);
                }

                return newHtml;
            }

        }
    });

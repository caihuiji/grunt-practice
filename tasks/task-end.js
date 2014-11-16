/**
 * Created by ji on 2014/11/13.
 */
module.exports = function (grunt){

    grunt.registerMultiTask('end' , 'task for end' , function (){

        var timestamp =  new Date - this.options().startDate;
        grunt.log.success ( (timestamp/1000) + 's' );
    } );

}
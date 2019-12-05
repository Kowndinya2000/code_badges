var cmd=require('node-cmd');
 
    cmd.get(
        'node index3.js',
        function(err, data, stderr){
            console.log("Working Server is initiated");
        }
    );
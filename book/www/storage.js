$(function () {
    
        // Get a reference to the storage service, which is used to create references in your storage bucket
        var storage = firebase.storage();
    
        // Points to the root reference
        var storageRef = firebase.storage().ref();
        
    
        $("#upload").click(function () {
    
            var photofile = $("#photo").prop("files")[0];
            var timestamp = Number(new Date());
            var photoRef = storageRef.child("photos/" + timestamp + ".png");
    
            photoRef.put(photofile).then(function (snapshot) {
                console.log("Uploaded a blob or file!");            
                photoRef.getDownloadURL().then(function (url) {
                    // Insert url into an <img> tag to "download"
                    $("#photo1").attr("src", url);
                })
            });
        });
    
    });
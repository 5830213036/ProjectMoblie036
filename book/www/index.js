
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBmBrREQl7qie4yEvSOqFXkxpQFOdCAt1Y",
  authDomain: "fir-f9120.firebaseapp.com",
  databaseURL: "https://fir-f9120.firebaseio.com",
  projectId: "fir-f9120",
  storageBucket: "fir-f9120.appspot.com",
  messagingSenderId: "377816222009"
};
firebase.initializeApp(config);

      function insertData(userId, description, category) {
          firebase.database().ref('users/' + userId).set({
              description: description,
              category: category
          });          
      }

      function insertAutoKey(description, category) {
          // A post entry.
          var postData = {
            description: description,
            category: category
          };

          // Get a key for a new Post.
          var newPostKey = firebase.database().ref().child('users').push().key;
          // Write the new post's data simultaneously in the posts list and the user's post list.
          var updates = {};
          updates['/users/' + newPostKey] = postData;
          return firebase.database().ref().update(updates);
      }

      function readData(userId) {
          firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
              if (snapshot.val() === null) {
                  /* does not exist */
                  alert('NO INFORMATION');
              } else {
                  var tr = '<tr>' +
                              '<td>' + userId + '</td>' +
                              '<td>' + snapshot.val().description + '</td>' +
                              '<td>' + snapshot.val().category + '</td>' +
                          '</tr>';
                  $('#categoryList').append(tr);
              }
              console.log(snapshot.val());
          });
      }

      function readAllData() {
          var ref = firebase.database().ref().child("users");

          ref.on("value", function (snapshot) {
              snapshot.forEach(function (childSnapshot) {
                  // key will be "ada" the first time and "alan" the second time
                  var key = childSnapshot.key;
                  // childData will be the actual contents of the child
                  var childData = childSnapshot.val();
                  var tr = '<tr>' +
                              '<td>' + key + '</td>' +
                              '<td>' + childData.description + '</td>' +
                              '<td>' + childData.category + '</td>' +
                          '</tr>';
                  $('#lstTable').append(tr);
                  console.log(snapshot.val());
              });
          }, function (error) {
              console.log("Error: " + error.code);
          });
      }

      function updateData(userId, description, category) {
          // A post entry.
          var postData = {
            description: description,
            category: category,
          };
          var personRef = firebase.database().ref().child("users").child(userId);

          personRef.once('value', function (snapshot) {

              if (snapshot.val() === null) {
                  /* does not exist */
                  alert('NO INFORMATION');
              } else {
                  personRef.update(postData);
              }

          });
      }



      function deleteData(userId) {
          var personRef = firebase.database().ref().child("users").child(userId);
          personRef.once('value', function (snapshot) {

              if (snapshot.val() === null) {
                  /* does not exist */
                  alert('does not exist');
              } else {
                  personRef.remove();
              }

          });
      }
      $('#btnInsert').on('click', function () {
          var id = $('#txtId').val();
          var description = $('#txtUserName').val();
          var category = $('#txtEmail').val();
          document.getElementById("txtId").value = "";
          document.getElementById("txtUserName").value = "";
          document.getElementById("txtEmail").value = "";
          insertData(id, description, category);
      });
      $('#btnInsertAuto').on('click', function () {
          var description = $('#txtUserName').val();
          var category = $('#txtEmail1').val();
          document.getElementById("txtUserName").value = "";
          document.getElementById("txtEmail").value = "";
          insertAutoKey(description, category);
      });
      $('#btnRead').on('click', function () {
          var id = $('#txtId').val();
          if (id == '') {
              return;
          }
          readData(id);
      });
      $('#btnReadAll').on('click', function () {
          readAllData();
      });
      
      $('#btnUpdate').on('click', function () {
          var id = $('#txtId').val();
          var description = $('#txtUserName').val();
          var category = $('#txtEmail').val();
          document.getElementById("txtId").value = "";
          document.getElementById("txtUserName").value = "";
          document.getElementById("txtEmail").value = "";
          updateData(id, description, category);
      });
      $('#btnDelete').on('click', function () {
          var id = $('#txtId').val();
          deleteData(id);
      });
  
      document.addEventListener("deviceready", onDeviceReady, false);
      function onDeviceReady() {
          console.log(navigator.camera);
      }


      function initMap() {
        var uluru = {lat: 7.89347, lng: 98.35349};
        var map = new google.maps.Map(document.getElementById('map'), {
          
            asyncdefersrc="https://maps.googleapis.com/maps/api/js?key=AIzaSyCSu3FM2YaAN9JXw_TZ-szp2btuGj_Znts&callback=initMap",
           
          zoom: 15,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }
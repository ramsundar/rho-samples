var rc = require('rhoconnect_helpers');
var Parse = require('parse').Parse;

var ReportItem = function(){

  this.login = function(resp){
    resp.send(true);
  };

  this.query = function(resp){
    var result = {};
    // console.log('GOING TO QUERY THE DB');
        
    Parse.initialize("3zvw9xgwWsaTqF3LyJD7TIoEySn5rgUJkMSxkMRI", "ghqCxF1bVtNCl4oxUAMqovHtD5WRPJoEZ0YWxXoX");
    
    var pReportItem = Parse.Object.extend("ReportItem");
    var query = new Parse.Query(pReportItem);
    query.find({
      success: function(results) {
        for (var i = 0; i < results.length; i++) { 
          var object = { reportid: results[i].get('reportid'), 
              productid: results[i].get('productid'),
              imgsrcLocal: results[i].get('imgsrcLocal'),
              imgsrcRemote: results[i].get('imgsrcRemote'),
              status: results[i].get('status'),
            };
          result[results[i].id.toString()] = object;
        }
        // console.log('DONE');
        // console.log(result);
        resp.send(result);

      },
      error: function(error) {
        // console.log('ERROR');
        resp.send(result);
      }
    });
  };

  this.create = function(resp){
    // console.log('Creating');
    // console.log(resp.params.create_object);
    Parse.initialize("3zvw9xgwWsaTqF3LyJD7TIoEySn5rgUJkMSxkMRI", "ghqCxF1bVtNCl4oxUAMqovHtD5WRPJoEZ0YWxXoX");
    var PObject = Parse.Object.extend("ReportItem");
    var pObject = new PObject();
    pObject.save(resp.params.create_object, {
      success: function(object) {
        pid=object.id;
        resp.send(pid);
        },
      error: function(object) {
        resp.send('-1');
        }
      });
  };

  this.update = function(resp){
    // TODO: Update an existing record in your backend data source.
    // Then return the result.
    var objId = resp.params.update_object.id;
    Parse.initialize("3zvw9xgwWsaTqF3LyJD7TIoEySn5rgUJkMSxkMRI", "ghqCxF1bVtNCl4oxUAMqovHtD5WRPJoEZ0YWxXoX");
    var PObject = Parse.Object.extend("ReportItem");
    var query = new Parse.Query(PObject);
    query.get(objId, {
      success: function(pObject) {
        // The object was retrieved successfully.
        pObject.save(resp.params.update_object, {
              success: function(object) {
                
                resp.send(true);
                },
              error: function(object) {
                resp.send(false);
                }
              });

      },
      error: function(object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and description.
        resp.send(false);
      }
    });


    
  };

  this.del = function(resp){
    // TODO: Delete an existing record in your backend data source
    // if applicable.  Be sure to have a hash key and value for
    // "object" and return the result.
    var objId = resp.params.delete_object.id;
    Parse.initialize("3zvw9xgwWsaTqF3LyJD7TIoEySn5rgUJkMSxkMRI", "ghqCxF1bVtNCl4oxUAMqovHtD5WRPJoEZ0YWxXoX");
    var PObject = Parse.Object.extend("ReportItem");
    var query = new Parse.Query(PObject);
    query.get(objId, {
      success: function(pObject) {
        // The object was retrieved successfully.
        pObject.destroy( {
              success: function(object) {
                
                resp.send(true);
                },
              error: function(object) {
                resp.send(false);
                }
              });

      },
      error: function(object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and description.
        resp.send(false);
      }
    });

    resp.send(true);
  };

  this.logoff = function(resp){
    // TODO: Logout from the data source if necessary.
    resp.send(true);
  };

  this.storeBlob = function(resp){
    // TODO: Handle post requests for blobs here.
    // Reference the blob object's path with resp.params.path.
    new rc.Exception(
      resp, "Please provide some code to handle blobs if you are using them."
    );
  };
};

module.exports = new ReportItem();
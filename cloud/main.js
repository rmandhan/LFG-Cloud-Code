
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.job('deleteOldPosts', function(request, status) {
    // All access
    Parse.Cloud.useMasterKey();

    var today = new Date();
    var days = 10;
    var time = (days * 24 * 3600 * 1000);
    var expirationDate = new Date(today.getTime() - (time));

    var query = new Parse.Query('Post');
        // All posts have more than 10 days
        query.lessThan('createdAt', expirationDate);

        query.find().then(function (posts) {
            Parse.Object.destroyAll(posts, {
                success: function() {
                    status.success('All posts are removed.');
                },
                error: function(error) {
                    status.error('Error, posts are not removed.');
                }
            });
        }, function (error) {});
});

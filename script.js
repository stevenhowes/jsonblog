$(document).ready(function() {
    // Load blog posts from JSON file
    $.getJSON("posts/index.json", function(data) {
        // Sort posts by timestamp in descending order
        data.sort((a, b) => b.timestamp - a.timestamp);

        // Iterate through each post in the sorted JSON data
        $.each(data, function(index, post) {
            // Convert epoch timestamp to human-readable date format
            var postDate = new Date(post.timestamp * 1000); // Convert seconds to milliseconds

            // Format date
            var formattedDate = postDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });

            // Fetch content for each post from separate file
            $.get(`posts/${post.uuid}`, function(content) {
                // Create HTML for the post
                var postHTML = `
                    <article>
                        <h2>${post.title}</h2>
                        <p class="metadata">Posted on ${formattedDate} by ${post.author}</p>
                        <div class="post-content">${content}</div>
                    </article>
                `;
                // Append the post HTML to the blog-posts section
                $("#blog-posts").append(postHTML);
            });
        });
    });
});


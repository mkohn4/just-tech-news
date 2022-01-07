
async function editFormHandler(event) {
    event.preventDefault();
    const title = document.querySelector('input[name="post-title"]').value;
    console.log(event.target.children);

    console.log('edit button clicked');
    console.log(window.location.toString().split('/'));
    const urlArray = window.location.toString().split('/');
    const id = urlArray[urlArray.length - 1];
    //need to find a way to get the post title here
    console.log(title);
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title:title
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(response);
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}



document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);


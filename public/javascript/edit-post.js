
async function editFormHandler(event) {
    event.preventDefault();

    console.log('edit button clicked');

    const id = window.location.toString().split('/')[
        window.location.toString.split('/').length - 1
    ];
    //need to find a way to get the post title here
    const title = document.querySelector('input[name="post-title"]').value.trim();
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title
        }),
        header: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}



document.querySelector('.edit-post-btn').addEventListener('submit', editFormHandler);


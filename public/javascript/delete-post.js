async function deleteFormHandler(event) {
    event.preventDefault();

    console.log('delete button clicked');

    const id = window.location.toString().split('/')[
        window.location.toString.split('/').length - 1
    ];
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });
    
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}



document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);
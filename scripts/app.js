console.log('script is connected');

// Fetching the nav API and Converting it to JSON Format

function loadCategories() {
  // 1 = fetching Data
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')

    // 2 = Converting Data
    .then(res => res.json())

    // 3 = sending Data to display category
    .then((data) => displayCategories(data.categories))
}

// Creating the Dynamic Nav Buttons

function displayCategories(categories) {
  // Get the container
  const categoryContainer = document.getElementById('category-container');

  // Loop upon the Array of Objects
  for (const category of categories) {

    // Create element
    const categoryDiv = document.createElement('div');
    categoryDiv.innerHTML = `
    <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>
    `

    // Append the element
    categoryContainer.append(categoryDiv);
  }
}

// Fetching Video API's and converting to JSON

function loadVideos() {
  fetch(' https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
}


// Creating the Dynamic Video Containers

// {
//   "category_id": "1003",
//     "video_id": "aaak",
//       "thumbnail": "https://i.ibb.co/ZNggzdm/cake.jpg",
//         "title": "Beyond The Pale",
//           "authors": [
//             {
//               "profile_picture": "https://i.ibb.co/MZ2vbXR/jimm.jpg",
//               "profile_name": "Jim Gaffigan",
//               "verified": false
//             }
//           ],
//             "others": {
//     "views": "2.6K",
//       "posted_date": "15400"
//   },
//   "description": "'Beyond The Pale' by Jim Gaffigan, with 2.6K views, is a comedic gem that explores everyday observations and family life with a light-hearted and witty approach. Jim's humor is accessible and delightful, making this show perfect for anyone who enjoys clean, observational comedy."
// }

const displayVideos = (videos) => {
  const videoContainer = document.getElementById('video-container');

  videos.forEach((video => {
    console.log(video);

    const videoCard = document.createElement('div');

    videoCard.innerHTML = `
    
    <div class="card bg-base-100">
        <figure class="relative">
          <img class="w-full h-[150px] object-cover" src="${video.thumbnail}" />

          <span class="absolute bottom-2 right-2 text-white text-sm bg-black px-2 rounded-md">3hrs 56 min ago</span>
        </figure>
        <div class="flex gap-3 px-0 py-5">

          <!-- Profile Section -->
          <div class="profile">
            <div class="avatar">
              <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                <img src="${video.authors[0].profile_picture
      }" />
              </div>
            </div>
          </div>

          <!-- Intro Section -->
          <div class="intro">
            <h2 class="text-sm font-semibold">${video.title}
            </h2>
            <p class="text-sm text-gray-400 flex gap-2">${video.authors[0].profile_name} <img class="w-5 h-5"
                src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt=""></p>
            <p class="text-gray-400 text-sm">${video.others.views} Views</p>
          </div>

        </div>
      </div>

    `
    videoContainer.append(videoCard);
  }))
};

loadCategories();

loadVideos()
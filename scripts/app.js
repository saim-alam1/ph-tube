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
    <button id="btn-${category.category_id}" onclick="loadCategoryVideos(${category.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>
    `

    // Append the element
    categoryContainer.append(categoryDiv);
  }
}

// Fetching Video API's and converting to JSON

function loadVideos() {
  fetch(' https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    .then(data => {
      removeActiveClass();
      document.getElementById('btn-all').classList.add('active');
      displayVideos(data.videos)
    })
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

  videoContainer.innerHTML = '';

  if (videos.length === 0) {
    videoContainer.innerHTML = `
    <div class="col-span-full flex flex-col items-center text-center py-20">
        <img class="w-[150px]" src="assets/Icon.png" alt="">
        <h2 class="text-2xl font-bold mt-3">Oops!! Sorry, There is no content here</h2>
      </div>
    `
    return;
  }

  videos.forEach((video => {
    // console.log(video);

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
        <button onclick=loadVideoDetails('${video.video_id}') class="btn btn-block">Show Details</button>
      </div>

    `
    videoContainer.append(videoCard);
  }))
};

// Loading categorys
const loadCategoryVideos = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const buttonClicked = document.getElementById(`btn-${id}`);
      removeActiveClass();
      buttonClicked.classList.add('active');
      console.log(buttonClicked);

      displayVideos(data.category)
    })
}

function removeActiveClass() {
  const activeClass = document.getElementsByClassName('active');

  for (const btn of activeClass) {
    btn.classList.remove('active');
  }
}

const loadVideoDetails = (videoId) => {
  console.log(videoId);
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;

  fetch(url).then(res => res.json())
    .then(data => displayVideoDetails(data.video
    ));
}

const displayVideoDetails = (video) => {
  document.getElementById('video_details').showModal();

  console.log(video);

  const detailsContainer = document.getElementById('details-container');

  detailsContainer.innerHTML = `
  <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
  </div>
</div>
  `
}

loadCategories();
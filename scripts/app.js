console.log('script is connected');

function loadCategories() {
  // 1 = fetching Data
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')

    // 2 = Converting Data
    .then(res => res.json())

    // 3 = sending Data to display category
    .then((data) => displayCategories(data.categories))
}


// {
//   "category_id": "1001",
//     "category": "Music"
// }


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

loadCategories();
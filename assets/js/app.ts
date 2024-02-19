const keywordInput = document.getElementById("search") as HTMLInputElement;
const searchButton = document.getElementById(
  "search-button"
) as HTMLButtonElement;
const resultsTable = document.getElementById(
  "results-table"
) as HTMLTableElement;
const pagination = document.getElementById("pagination") as HTMLDivElement;

let currentPage = 1;

async function fetchGitHubUsers(keyword: string, page: number) {
  try {
    const response = await fetch(
      `https://api.github.com/search/users?q=${keyword}&page=${page}&per_page=9`
    );
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const users = data.items;
      const tableBody = resultsTable.querySelector("tbody");
      if (tableBody === null) {
        throw new Error("Table body not found");
      }
      // Clear previous results
      tableBody.innerHTML = "";

      // Populate the table with user data
      users.forEach((user: any, index: number) => {
        const row = tableBody.insertRow();
        row.classList.add("bg-dark-table-color");
        row.classList.add("border-light");
        const numberCell = row.insertCell(0);
        const avatarCell = row.insertCell(1);
        const loginCell = row.insertCell(2);
        const typeCell = row.insertCell(3);

        numberCell.textContent = `${++index}`;
        avatarCell.innerHTML = `<img src="${user.avatar_url}" alt="Avatar" width="40">`;
        loginCell.textContent = user.login;
        typeCell.textContent = user.type;

        numberCell.classList.add("light-color");
        numberCell.classList.add("bg-purple-color");

        avatarCell.classList.add("light-color");
        loginCell.classList.add("light-color");
        typeCell.classList.add("light-color");
      });

      // Display pagination controls
      displayPaginationControls(page);
    } else {
      resultsTable.innerHTML = "<p>No results found.</p>";
      pagination.innerHTML = ""; // Clear pagination controls
    }
  } catch (error) {
    resultsTable.innerHTML = `<p>Error: ${error}</p>`;
    pagination.innerHTML = ""; // Clear pagination controls
  }
}

function displayPaginationControls(currentPage: number) {
  const totalPages = Math.ceil(1000 / 9); //Only the first 1000 search results are available
  const paginationHTML = [];

  const maxPageNumbersToShow = 5;

  let startPage = Math.max(
    1,
    currentPage - Math.floor(maxPageNumbersToShow / 2)
  );
  let endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

  // Ensure that we have exactly maxPageNumbersToShow page numbers
  while (endPage - startPage + 1 < maxPageNumbersToShow) {
    startPage = Math.max(1, startPage - 1);
    endPage = Math.min(totalPages, endPage + 1);
  }

  // Add the first page
  if (startPage > 1) {
    paginationHTML.push(
      '<button class="btn btn-pagination light-color" onclick="changePage(1)">1</button>'
    );
    if (startPage > 2) {
      paginationHTML.push('<span class="ellipsis">...</span>');
    }
  }

  // Add the page numbers
  for (let i = startPage; i <= endPage; i++) {
    if (i === currentPage) {
      paginationHTML.push(`<span class="active">${i}</span>`);
    } else {
      paginationHTML.push(
        `<button class="btn btn-pagination light-color" onclick="changePage(${i})">${i}</button>`
      );
    }
  }

  // Add the last page
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      paginationHTML.push('<span class="ellipsis">...</span>');
    }
    paginationHTML.push(
      `<button class="btn btn-pagination light-color" onclick="changePage(${totalPages})">${totalPages}</button>`
    );
  }

  pagination.innerHTML = paginationHTML.join(" ");
}

function changePage(pageNumber: number) {
  currentPage = pageNumber;
  const keyword = keywordInput.value.trim();
  if (keyword) {
    fetchGitHubUsers(keyword, currentPage);
  }
}

// Event listener for the search button
searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  currentPage = 1;
  const keyword = keywordInput.value.trim();
  if (keyword) {
    fetchGitHubUsers(keyword, currentPage);
  }
});

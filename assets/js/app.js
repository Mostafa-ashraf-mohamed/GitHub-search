var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var keywordInput = document.getElementById("search");
var searchButton = document.getElementById("search-button");
var resultsTable = document.getElementById("results-table");
var pagination = document.getElementById("pagination");
var currentPage = 1;
function fetchGitHubUsers(keyword, page) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, users, tableBody_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://api.github.com/search/users?q=".concat(keyword, "&page=").concat(page, "&per_page=9"))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (data.items && data.items.length > 0) {
                        users = data.items;
                        tableBody_1 = resultsTable.querySelector("tbody");
                        if (tableBody_1 === null) {
                            throw new Error("Table body not found");
                        }
                        // Clear previous results
                        tableBody_1.innerHTML = "";
                        // Populate the table with user data
                        users.forEach(function (user, index) {
                            var row = tableBody_1.insertRow();
                            row.classList.add("bg-dark-table-color");
                            row.classList.add("border-light");
                            var numberCell = row.insertCell(0);
                            var avatarCell = row.insertCell(1);
                            var loginCell = row.insertCell(2);
                            var typeCell = row.insertCell(3);
                            numberCell.textContent = "".concat(++index);
                            avatarCell.innerHTML = "<img src=\"".concat(user.avatar_url, "\" alt=\"Avatar\" width=\"40\">");
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
                    }
                    else {
                        resultsTable.innerHTML = "<p>No results found.</p>";
                        pagination.innerHTML = ""; // Clear pagination controls
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    resultsTable.innerHTML = "<p>Error: ".concat(error_1, "</p>");
                    pagination.innerHTML = ""; // Clear pagination controls
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function displayPaginationControls(currentPage) {
    var totalPages = Math.ceil(1000 / 9); //Only the first 1000 search results are available
    var paginationHTML = [];
    var maxPageNumbersToShow = 5;
    var startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
    var endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);
    // Ensure that we have exactly maxPageNumbersToShow page numbers
    while (endPage - startPage + 1 < maxPageNumbersToShow) {
        startPage = Math.max(1, startPage - 1);
        endPage = Math.min(totalPages, endPage + 1);
    }
    // Add the first page
    if (startPage > 1) {
        paginationHTML.push('<button class="btn btn-pagination light-color" onclick="changePage(1)">1</button>');
        if (startPage > 2) {
            paginationHTML.push('<span class="ellipsis">...</span>');
        }
    }
    // Add the page numbers
    for (var i = startPage; i <= endPage; i++) {
        if (i === currentPage) {
            paginationHTML.push("<span class=\"active\">".concat(i, "</span>"));
        }
        else {
            paginationHTML.push("<button class=\"btn btn-pagination light-color\" onclick=\"changePage(".concat(i, ")\">").concat(i, "</button>"));
        }
    }
    // Add the last page
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationHTML.push('<span class="ellipsis">...</span>');
        }
        paginationHTML.push("<button class=\"btn btn-pagination light-color\" onclick=\"changePage(".concat(totalPages, ")\">").concat(totalPages, "</button>"));
    }
    pagination.innerHTML = paginationHTML.join(" ");
}
function changePage(pageNumber) {
    currentPage = pageNumber;
    var keyword = keywordInput.value.trim();
    if (keyword) {
        fetchGitHubUsers(keyword, currentPage);
    }
}
// Event listener for the search button
searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    currentPage = 1;
    var keyword = keywordInput.value.trim();
    if (keyword) {
        fetchGitHubUsers(keyword, currentPage);
    }
});

const GITHUB_API_URL = 'https://api.github.com/repos/{owner}/{repo}/readme';
const API_KEY = '
live_ac503cb3e9ac15fd5c33b15391cf7aefc56e70f6193ac938586facfac3de4969efe8d04e6d233bd35cf2fabdeb93fb0d'; // GitHub API Key 입력

fetch(GITHUB_API_URL, {
    method: 'GET',
    headers: {
        'Authorization': `token ${API_KEY}`,
        'Accept': 'application/vnd.github.v3.raw' // RAW 형태로 받기
    }
})
.then(response => response.json())
.then(data => {
    const markdownContent = data.content;
    const decodedContent = atob(markdownContent); // Base64 디코딩
    const imageUrls = extractImageUrls(decodedContent);
    displayImages(imageUrls);
})
.catch(error => console.error('Error fetching data:', error));

// 이미지 URL 추출 함수
function extractImageUrls(markdown) {
    const urlRegex = /!\[.*?\]\((.*?)\)/g; // 이미지 URL 패턴
    let urls = [];
    let match;
    while ((match = urlRegex.exec(markdown)) !== null) {
        urls.push(match[1]); // URL 추가
    }
    return urls;
}

// 이미지 표시 함수
function displayImages(urls) {
    const imageContainer = document.getElementById('image-container');
    urls.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Image from GitHub';
        imageContainer.appendChild(img);
    });
}

// JavaScript to fetch data from WordPress API and populate the section
(async function populateBlogPosts() {
    fetch('https://interdata.vn/blog/wp-json/wp/v2/posts?orderby=date&order=desc&_embed')
    .then((response) => response.json())  // Chuyển đổi dữ liệu trả về thành JSON
    .then((data) => {
      const newsContainer = document.getElementById('news-container');
      
      // Lặp qua 4 bài viết và chèn vào trong grid-news
      data.slice(0, 4).forEach((post, index) => {
        // Tạo phần tử bài viết mới
        const newsItem = document.createElement('div');
        newsItem.classList.add('grid-news-item');

        let postContent = `
          <div class="block">
            <a class="absolute" alt="" title="" href="${post.link}"></a>
            <div class="info">
              <div class="sub-info">
                <span class="tag">Công nghệ</span>
                <span class="datetime">${new Date(post.date).toLocaleDateString()}</span>
              </div>
              <h2 class="tt">
                <span>${post.title.rendered}</span>
              </h2>
              <div class="desc">${post.excerpt.rendered}</div>
              <div class="link-more">
                <span>
                  Xem thêm <i class="fa fa-long-arrow-right"></i>
                </span>
              </div>
            </div>
          </div>
        `;

        // Thêm hình ảnh chỉ cho bài viết đầu tiên
        if (index === 0 && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
          postContent = `
            <div class="block">
              <a class="absolute" alt="" title="" href="${post.link}"></a>
              <div class="thumb-res wide">
                <img src="${post._embedded['wp:featuredmedia'][0].source_url}" alt="${post.title.rendered}" />
              </div>
              <div class="info">
                <div class="sub-info">
                  <span class="tag">Công nghệ</span>
                  <span class="datetime">${new Date(post.date).toLocaleDateString()}</span>
                </div>
                <h2 class="tt">
                  <span>${post.title.rendered}</span>
                </h2>
                <div class="desc">${post.excerpt.rendered}</div>
                <div class="link-more">
                  <span>
                    Xem thêm <i class="fa fa-long-arrow-right"></i>
                  </span>
                </div>
              </div>
            </div>
          `;
        }
        
        newsItem.innerHTML = postContent;
        // Thêm bài viết vào container
        newsContainer.appendChild(newsItem);
      });
    })
    .catch((error) => {
      console.error('Error fetching posts:', error);
    });
})();

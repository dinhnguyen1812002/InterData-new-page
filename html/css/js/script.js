// JavaScript to fetch data from WordPress API and populate the section
(async function populateBlogPosts() {
    const apiUrl = 'https://interdata.vn/blog/wp-json/wp/v2/posts?_embed&per_page=4&orderby=date&order=desc';
    const section = document.querySelector('.block-bg .grid-news');
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Failed to fetch posts');
  
      const posts = await response.json();
  
      // Clear existing content in the grid-news
      section.innerHTML = '';
  
      posts.forEach((post, index) => {
        const imageUrl = index === 0 && post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? post._embedded['wp:featuredmedia'][0].source_url : null;
        const postDate = new Date(post.date).toLocaleDateString('vi-VN');
        const postCategory = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Uncategorized';
  
        const postHTML = `
          <div class="grid-news-item">
            <div class="block">
              <a class="absolute" href="${post.link}" title="${post.title.rendered}"></a>
              ${imageUrl ? `<div class="thumb-res wide thumb-news">
                <img src="${imageUrl}" alt="${post.title.rendered}" />
              </div>` : ''}
              <div class="info">
                <div class="sub-info">
                  <span class="tag">${postCategory}</span>
                  <span class="datetime">${postDate}</span>
                </div>
                <h3 class="tt">
                  <span>${post.title.rendered}</span>
                </h3>
                <div class="desc">
                  <p> ${post.excerpt.rendered} </p>
                 
                </div>
                <div class="link-more">
                  <span>Xem thêm <i class="fa fa-long-arrow-right"></i></span>
                </div>
              </div>
            </div>
          </div>`;
  
        section.insertAdjacentHTML('beforeend', postHTML);
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
      section.innerHTML = '<p>Không thể tải bài viết. Vui lòng thử lại sau.</p>';
    }
  })();
  
// Định nghĩa kiểu dữ liệu cho sản phẩm
interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  urlImage: string;
}

// Hàm để gọi API
async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch('https://localhost:7070/api/Product', {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: Product[] = await response.json(); // Phân tích dữ liệu JSON
    console.log(data);
    return data; // Trả về dữ liệu sản phẩm
  } catch (error) {
    console.error('Fetch error:', error);
    throw error; // Ném lỗi để xử lý ở nơi khác
  }
}

// Hàm để gán sản phẩm vào phần tử HTML
function displayProducts(products: Product[]): void {
  const productGrid = document.getElementById('product-grid'); // Lấy phần tử HTML

  if (productGrid) {
    productGrid.innerHTML = ''; // Xóa nội dung cũ

    products.forEach(product => {
      const productItem = document.createElement('div'); // Tạo phần tử div cho mỗi sản phẩm
      productItem.className = 'product-item'; // Gán lớp CSS

      productItem.innerHTML = `
        <img alt="${product.name}" height="200" src="${product.urlImage}" width="200" />
        <p>${product.name}</p>
        <p>${product.price.toLocaleString('vi-VN')}₫</p>
      `; // Gán nội dung cho sản phẩm

      productGrid.appendChild(productItem); // Thêm sản phẩm vào lưới sản phẩm
    });
  }
}

// Gọi hàm và xử lý dữ liệu
fetchProducts()
  .then(products => {
    console.log(products); // In ra danh sách sản phẩm
    displayProducts(products); // Gọi hàm để hiển thị sản phẩm
  })
  .catch(error => {
    console.error('Error fetching products:', error);
  });

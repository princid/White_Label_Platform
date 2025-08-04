import React from "react";

const ProductGrid = ({
	title,
	products = [],
	backgroundColor,
	textColor,
	cardBackgroundColor,
	showTitle = true,
	showPrice = true,
	showDescription = true,
	showButton = true,
	device = 'desktop',
}) => {
	// Default products if none provided
	const defaultProducts = [
		{
			id: 1,
			name: "Product 1",
			price: 29.99,
			description: "Classic product",
			image:
				"https://www.lo10m.com/cdn/shop/products/air-jordan-1-low-reverse-black-toe-w-lo10m-10_1500x.jpg?v=1716820975",
		},
		{
			id: 2,
			name: "Product 2",
			price: 49.99,
			description: "High-quality product",
			image:
				"https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
		},
		{
			id: 3,
			name: "Product 3",
			price: 79.99,
			description: "Premium product",
			image:
				"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
		},
		{
			id: 4,
			name: "Product 4",
			price: 99.99,
			description: "Exclusive product",
			image:
				"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
		},
	];

	const displayProducts = products.length > 0 ? products : defaultProducts;

	// Determine column class based on device view
	const getColumnClass = () => {
		console.log('ProductGrid Device:', device);
		if (device === 'mobile') {
			return 'col-12 col-lg-12'; // Full width on mobile view
		} else {
			return 'col-12 col-lg-3'; // 4 columns on desktop view
		}
	};

	return (
		<div
			style={{
				padding: "20px",
				background: backgroundColor || "transparent",
			}}
		>
			{showTitle && (
				<h3
					style={{
						marginBottom: "20px",
						textAlign: "center",
						color: textColor || "#333",
						fontSize: "2rem",
						fontWeight: "600",
					}}
					className="product-grid-title"
				>
					{title || "Our Products"}
				</h3>
			)}
			<div
				className="row g-3 g-md-4"
				style={{
					maxWidth: "1200px",
					margin: "0 auto",
				}}
			>
				{displayProducts.map((product, index) => (
					<div
						key={product.id || index}
						className={getColumnClass()}
					>
						<div
							style={{
								border: "1px solid #ddd",
								borderRadius: "12px",
								padding: "15px",
								textAlign: "center",
								background: cardBackgroundColor || "white",
								transition: "transform 0.2s",
								cursor: "pointer",
								height: "100%",
								display: "flex",
								flexDirection: "column"
							}}
							className="product-card h-100"
							onMouseEnter={(e) => { 
								e.target.style.transform = "translateY(-4px)";
							}}
							onMouseLeave={(e) => {
								e.target.style.transform = "translateY(0)";
							}}
						>
						<div
							style={{
								width: "100%",
								height: "200px",
								background: "#f0f0f0",
								borderRadius: "8px",
								marginBottom: "15px",
								overflow: "hidden",
							}}
						>
							<img
								src={product.image}
								alt={product.name}
								style={{
									width: "100%",
									height: "100%",
									objectFit: "cover",
								}}
							/>
						</div>
						<div className="flex-grow-1 d-flex flex-column">
							<h4
								className="product-title"
								style={{
									marginBottom: "8px",
									color: textColor || "#333",
									fontSize: "1.1rem",
									fontWeight: "600",
								}}
							>
								{product.name}
							</h4>
							{showDescription && (
								<p
									className="product-description"
									style={{
										color: textColor ? `${textColor}CC` : "#666",
										marginBottom: "12px",
										fontSize: "0.9rem",
										lineHeight: "1.4",
										flex: "1"
									}}
								>
									{product.description}
								</p>
							)}
							{showPrice && (
								<div
									className="product-price"
									style={{
										fontWeight: "700",
										color: "#007bff",
										marginBottom: "12px",
										fontSize: "1.2rem",
									}}
								>
									${product.price}
								</div>
							)}
							{showButton && (
								<button
									className="btn btn-primary"
									style={{
										borderRadius: "6px",
										fontWeight: "500",
										fontSize: "0.9rem",
									}}
								>
									<i className="bi bi-cart-plus me-2"></i>
									Add to Cart
								</button>
							)}
						</div>
					</div>
				</div>
				))}
			</div>
		</div>
	);
};

export default ProductGrid;

<template>
	<div class="app">
		<header class="header">
			<h1>EHMDS - Layered Design System on FKUI</h1>
			<p>
				Proof-of-concept exploring architectural patterns for building
				one design system on another
			</p>
			<div class="header-links">
				<a
					href="https://github.com/pattespatte/ehmds-on-fkui-test"
					target="_blank"
					>GitHub</a
				>
				<router-link to="/docs/">Architecture Docs</router-link>
			</div>
		</header>

		<!-- Architecture Pattern Overview -->
		<nav class="pattern-nav">
			<h2>Architectural Patterns</h2>
			<div class="pattern-list">
				<div
					class="pattern-item"
					@click="scrollToSection('token-override')"
				>
					<div class="pattern-icon">🎨</div>
					<div class="pattern-info">
						<h3>Token Override</h3>
						<p>CSS variable overrides only (~10 lines)</p>
					</div>
					<div class="pattern-arrow">→</div>
				</div>
				<div class="pattern-item" @click="scrollToSection('wrapper')">
					<div class="pattern-icon">📦</div>
					<div class="pattern-info">
						<h3>Wrapper/Facade</h3>
						<p>Simplified API, same component (~50 lines)</p>
					</div>
					<div class="pattern-arrow">→</div>
				</div>
				<div class="pattern-item" @click="scrollToSection('extension')">
					<div class="pattern-icon">➕</div>
					<div class="pattern-info">
						<h3>Extension</h3>
						<p>FKUI features + EHMDS enhancements (~100 lines)</p>
					</div>
					<div class="pattern-arrow">→</div>
				</div>
				<div
					class="pattern-item"
					@click="scrollToSection('composition')"
				>
					<div class="pattern-icon">🧩</div>
					<div class="pattern-info">
						<h3>Composition</h3>
						<p>
							Multiple FKUI components, one domain component (~150
							lines)
						</p>
					</div>
					<div class="pattern-arrow">→</div>
				</div>
			</div>
		</nav>

		<main class="main">
			<!-- Token Override Pattern -->
			<section id="token-override" class="demo-section pattern-section">
				<div class="pattern-header">
					<h2>🎨 Token Override Pattern</h2>
					<p class="pattern-description">
						Uses FKUI's <code>FBadge</code> as-is, only overriding
						CSS custom properties for visual changes. Minimal code,
						maximum FKUI compatibility.
					</p>
					<router-link
						to="/docs/architecture/token-override"
						class="pattern-docs-link"
						>Read documentation →</router-link
					>
				</div>

				<div class="demo-block fkui-reference">
					<span class="fkui-reference__tag">FKUI ORIGINAL</span>
					<h3>FBadge</h3>
					<p class="fkui-reference__note">
						Raw FKUI badges with standard statuses — no EHMDS overrides.
					</p>
					<div class="demo-row">
						<FBadge status="default">Default</FBadge>
						<FBadge status="info">Info</FBadge>
						<FBadge status="success">Success</FBadge>
						<FBadge status="warning">Warning</FBadge>
						<FBadge status="error">Error</FBadge>
					</div>
				</div>

				<div class="demo-block">
					<span class="example-label">[EXAMPLE COMPONENT]</span>
					<h3>EhmBadge</h3>
					<div class="demo-row">
						<EhmBadge status="brand">Brand (EHMDS)</EhmBadge>
						<EhmBadge status="neutral">Neutral (EHMDS)</EhmBadge>
						<EhmBadge status="default">Default (FKUI)</EhmBadge>
						<EhmBadge status="info">Info (FKUI)</EhmBadge>
						<EhmBadge status="success">Success (FKUI)</EhmBadge>
						<EhmBadge status="warning">Warning (FKUI)</EhmBadge>
						<EhmBadge status="error">Error (FKUI)</EhmBadge>
					</div>
				</div>

				<div class="demo-block">
					<span class="example-label">[EXAMPLE COMPONENT]</span>
					<h3>EhmBadge</h3>
					<div class="demo-row">
						<EhmBadge status="brand" :inverted="true"
							>Brand Inverted</EhmBadge
						>
						<EhmBadge status="neutral" :inverted="true"
							>Neutral Inverted</EhmBadge
						>
						<EhmBadge status="success" :inverted="true"
							>Success Inverted</EhmBadge
						>
					</div>
				</div>

				<div class="code-block">
					<pre>
&lt;!-- Minimal code - just CSS overrides --&gt;
&lt;EhmBadge status="brand"&gt;New Feature&lt;/EhmBadge&gt;</pre
					>
				</div>
			</section>

			<!-- Wrapper Pattern -->
			<section id="wrapper" class="demo-section pattern-section">
				<div class="pattern-header">
					<h2>📦 Wrapper/Facade Pattern</h2>
					<p class="pattern-description">
						Wraps FKUI's <code>FCard</code> with a simplified,
						customized EHMDS API. Transforms props, slots, and
						events between the two APIs.
					</p>
					<router-link
						to="/docs/architecture/wrapper"
						class="pattern-docs-link"
						>Read documentation →</router-link
					>
				</div>

				<div class="demo-block fkui-reference">
					<span class="fkui-reference__tag">FKUI ORIGINAL</span>
					<h3>FCard</h3>
					<p class="fkui-reference__note">
						Raw FKUI card — the component EhmCard wraps.
					</p>
					<div class="card-grid">
						<FCard>
							<template #header>Default FCard</template>
							<p>Standard FKUI card with default styling.</p>
						</FCard>
					</div>
				</div>

				<div class="demo-block">
					<span class="example-label">[EXAMPLE COMPONENT]</span>
					<h3>EhmCard</h3>
					<div class="card-grid">
						<EhmCard variant="default">
							<template #header>Default Variant</template>
							<p>Standard card with default styling.</p>
						</EhmCard>

						<EhmCard variant="bordered">
							<template #header>Bordered Variant</template>
							<p>Card with prominent border styling.</p>
						</EhmCard>

						<EhmCard variant="elevated">
							<template #header>Elevated Variant</template>
							<p>Card with shadow for depth.</p>
						</EhmCard>

						<EhmCard variant="compact">
							<template #header>Compact Variant</template>
							<p>Card with reduced padding.</p>
						</EhmCard>
					</div>
				</div>

				<div class="demo-block">
					<span class="example-label">[EXAMPLE COMPONENT]</span>
					<h3>EhmCard</h3>
					<div class="card-grid">
						<EhmCard variant="default" :has-error="false">
							<template #header>Normal State</template>
							<p>This card is in a normal state.</p>
						</EhmCard>

						<EhmCard variant="default" :has-error="showError">
							<template #header>Error State</template>
							<p>This card has an error. Note the red border.</p>
							<template #footer>
								<button
									class="toggle-button"
									@click="showError = !showError"
								>
									Toggle
								</button>
							</template>
						</EhmCard>
					</div>
				</div>

				<div class="code-block">
					<pre>
&lt;!-- Simplified EHMDS API vs FKUI --&gt;
&lt;EhmCard variant="elevated" :has-error="hasError"&gt;
  &lt;template #header&gt;Title&lt;/template&gt;
  Content here
&lt;/EhmCard&gt;</pre
					>
				</div>
			</section>

			<!-- Extension Pattern -->
			<section id="extension" class="demo-section pattern-section">
				<div class="pattern-header">
					<h2>➕ Extension Pattern</h2>
					<p class="pattern-description">
						Extends FKUI's <code>FTextField</code> with additional
						features while preserving all original functionality.
						Adds character count, helper text, error states, and
						prefix/suffix slots.
					</p>
					<router-link
						to="/docs/architecture/extension"
						class="pattern-docs-link"
						>Read documentation →</router-link
					>
				</div>

				<div class="demo-block fkui-reference">
					<span class="fkui-reference__tag">FKUI ORIGINAL</span>
					<h3>FTextField</h3>
					<p class="fkui-reference__note">
						Raw FKUI text field — no label, helper text, or character count.
					</p>
					<div class="form-grid">
						<FTextField
							v-model="fkuiTextValue"
							placeholder="Type something..."
						/>
					</div>
				</div>

				<div class="demo-block">
					<span class="example-label">[EXAMPLE COMPONENT]</span>
					<h3>EhmTextField</h3>
					<div class="form-grid">
						<EhmTextField
							v-model="name"
							label="Full Name"
							placeholder="Enter your name"
							required
						/>

						<EhmTextField
							v-model="email"
							label="Email Address"
							placeholder="you@example.com"
							type="email"
							helper-text="We'll never share your email with anyone else."
						/>

						<EhmTextField
							v-model="bio"
							label="Bio"
							placeholder="Tell us about yourself"
							:max-length="150"
							show-character-count
							helper-text="Brief description for your profile"
						/>
					</div>
				</div>

				<div class="demo-block">
					<span class="example-label">[EXAMPLE COMPONENT]</span>
					<h3>EhmTextField</h3>
					<div class="form-grid">
						<EhmTextField
							v-model="username"
							label="Username"
							placeholder="Choose a username"
							:error-message="usernameError"
							:has-error="!!usernameError"
						/>

						<EhmTextField
							v-model="password"
							label="Password"
							placeholder="Enter password"
							type="password"
							:error-message="passwordError"
							:has-error="!!passwordError"
							helper-text="Must be at least 8 characters"
						/>
					</div>
				</div>

				<div class="demo-block">
					<span class="example-label">[EXAMPLE COMPONENT]</span>
					<h3>EhmTextField</h3>
					<div class="form-grid">
						<EhmTextField
							v-model="website"
							label="Website"
							placeholder="yourwebsite.com"
							style="border-radius: 0 8px 8px 0"
						>
							<template #prefix>🌐</template>
						</EhmTextField>

						<EhmTextField
							v-model="amount"
							label="Amount"
							placeholder="0.00"
							type="number"
							style="border-radius: 0"

						>
							<template #prefix>$</template>
							<template #suffix>USD</template>
						</EhmTextField>
					</div>
				</div>

				<div class="code-block">
					<pre>
&lt;!-- EHMDS extensions on top of FTextField --&gt;
&lt;EhmTextField
  v-model="name"
  label="Full Name"
  :max-length="50"
  show-character-count
  helper-text="Enter your first and last name"
  :error-message="nameError"
  :has-error="!!nameError"
/&gt;</pre
					>
				</div>
			</section>

			<!-- Composition Pattern -->
			<section id="composition" class="demo-section pattern-section">
				<div class="pattern-header">
					<h2>🧩 Composition Pattern</h2>
					<p class="pattern-description">
						Composes <code>FTextField</code> with custom buttons
						and expandable toggle into a higher-level,
						domain-specific search component with coordinated state
						and behavior.
					</p>
					<router-link
						to="/docs/architecture/composition"
						class="pattern-docs-link"
						>Read documentation →</router-link
					>
				</div>

				<div class="demo-block fkui-reference">
					<span class="fkui-reference__tag">FKUI ORIGINAL</span>
					<h3>FTextField (standalone)</h3>
					<p class="fkui-reference__note">
						Raw FKUI text field — what you'd use without EHMDS composition.
					</p>
					<div class="fkui-search-reference">
						<FTextField
							v-model="fkuiSearchValue"
							placeholder="Search..."
							:inline="true"
						/>
						<button type="button" class="fkui-reference__btn">
							Search
						</button>
					</div>
				</div>

				<div class="demo-block">
					<span class="example-label">[EXAMPLE COMPONENT]</span>
					<h3>EhmSearchBox</h3>
					<div class="search-demo">
						<EhmSearchBox
							v-model="searchQuery"
							placeholder="Search users..."
							:debounce="300"
							:min-length="2"
							@search="handleSearch"
						>
							<template #results="{ query, isLoading }">
								<div class="search-results">
									<div
										v-if="isLoading"
										class="search-loading"
									>
										Searching...
									</div>
									<div
										v-else-if="
											query && searchResults.length === 0
										"
										class="search-empty"
									>
										No results found for "{{ query }}"
									</div>
									<div v-else-if="query" class="search-list">
										<div
											v-for="result in searchResults"
											:key="result.id"
											class="search-item"
										>
											<strong>{{ result.name }}</strong> -
											{{ result.email }}
										</div>
									</div>
								</div>
							</template>
						</EhmSearchBox>
					</div>
				</div>

				<div class="demo-block">
					<span class="example-label">[EXAMPLE COMPONENT]</span>
					<h3>EhmSearchBox</h3>
					<div class="search-demo">
						<EhmSearchBox
							v-model="advancedQuery"
							placeholder="Search products..."
							:expandable="true"
							:debounce="500"
							@search="handleAdvancedSearch"
						>
							<template #filters="{ query }">
								<div class="search-filters">
									<div class="filter-group">
										<label
											><input
												type="checkbox"
												v-model="filters.inStock"
											/>
											In Stock Only</label
										>
										<label
											><input
												type="checkbox"
												v-model="filters.onSale"
											/>
											On Sale</label
										>
									</div>
									<div class="filter-group">
										<label>Category:</label>
										<select v-model="filters.category">
											<option value="">
												All Categories
											</option>
											<option value="electronics">
												Electronics
											</option>
											<option value="clothing">
												Clothing
											</option>
											<option value="books">Books</option>
										</select>
									</div>
								</div>
							</template>

							<template #results="{ query, isLoading }">
								<div class="search-results">
									<div
										v-if="isLoading"
										class="search-loading"
									>
										Searching...
									</div>
									<div
										v-else-if="
											query && productResults.length === 0
										"
										class="search-empty"
									>
										No products found for "{{ query }}"
									</div>
									<div v-else-if="query" class="product-list">
										<div
											v-for="product in productResults"
											:key="product.id"
											class="product-item"
										>
											<span class="product-name">{{
												product.name
											}}</span>
											<span class="product-price"
												>${{ product.price }}</span
											>
										</div>
									</div>
								</div>
							</template>
						</EhmSearchBox>
					</div>
				</div>

				<div class="code-block">
					<pre>
&lt;!-- Domain component composing multiple FKUI components --&gt;
&lt;EhmSearchBox
  v-model="searchQuery"
  :expandable="true"
  :debounce="300"
  @search="handleSearch"
&gt;
  &lt;template #filters="{ query }"&gt;
    &lt;!-- Custom filter UI --&gt;
  &lt;/template&gt;

  &lt;template #results="{ query, isLoading }"&gt;
    &lt;!-- Custom results display --&gt;
  &lt;/template&gt;
&lt;/EhmSearchBox&gt;</pre
					>
				</div>
			</section>

			<!-- Pattern Comparison -->
			<section class="demo-section comparison-section">
				<h2>Pattern Comparison</h2>
				<table class="comparison-table">
					<thead>
						<tr>
							<th>Pattern</th>
							<th>Complexity</th>
							<th>Flexibility</th>
							<th>Maintenance</th>
							<th>Best For</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><strong>Token Override</strong></td>
							<td>⭐ Very Low</td>
							<td>⭐ Low</td>
							<td>⭐ Very Low</td>
							<td>Visual changes only</td>
						</tr>
						<tr>
							<td><strong>Wrapper</strong></td>
							<td>⭐⭐ Low-Medium</td>
							<td>⭐⭐⭐ High</td>
							<td>⭐⭐ Medium</td>
							<td>API simplification</td>
						</tr>
						<tr>
							<td><strong>Extension</strong></td>
							<td>⭐⭐⭐ Medium-High</td>
							<td>⭐⭐ Medium</td>
							<td>⭐⭐ Medium</td>
							<td>Adding features</td>
						</tr>
						<tr>
							<td><strong>Composition</strong></td>
							<td>⭐⭐⭐⭐ High</td>
							<td>⭐⭐⭐⭐ Very High</td>
							<td>⭐⭐⭐ High</td>
							<td>Domain components</td>
						</tr>
					</tbody>
				</table>
			</section>
		</main>

		<footer class="footer">
			<p>
				EHMDS - A proof-of-concept exploring layered design system
				architecture
			</p>
			<p>
				<a
					href="https://github.com/pattespatte/ehmds-on-fkui-test"
					target="_blank"
					>GitHub</a
				>
				<span>•</span>
				<a
					href="https://designsystem.forsakringskassan.se/"
					target="_blank"
					>FKUI</a
				>
				<span>•</span>
				Built with Vue 3 + Vite
			</p>
		</footer>
	</div>
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";
import { FBadge, FCard, FTextField } from "@fkui/vue";
import EhmBadge from "../components/token-override/EhmBadge.vue";
import EhmCard from "../components/wrapper/EhmCard.vue";
import EhmTextField from "../components/extension/EhmTextField.vue";
import EhmSearchBox from "../components/composition/EhmSearchBox.vue";

// === FKUI Reference Demo State ===
const fkuiTextValue = ref("");
const fkuiSearchValue = ref("");

// === Token Override Demo State ===
// No specific state needed for badges

// === Wrapper Demo State ===
const showError = ref(true);

// === Extension Demo State ===
const name = ref("");
const email = ref("");
const bio = ref("");
const username = ref("");
const password = ref("");
const website = ref("");
const amount = ref("");

// Validation errors
const usernameError = computed(() => {
	if (!username.value) return "";
	if (username.value.length < 3)
		return "Username must be at least 3 characters";
	if (!/^[a-zA-Z0-9_]+$/.test(username.value))
		return "Username can only contain letters, numbers, and underscores";
	return "";
});

const passwordError = computed(() => {
	if (!password.value) return "";
	if (password.value.length < 8)
		return "Password must be at least 8 characters";
	return "";
});

// === Composition Demo State ===
const searchQuery = ref("");
const advancedQuery = ref("");

// Mock user data
const mockUsers = [
	{ id: 1, name: "Alice Johnson", email: "alice@example.com" },
	{ id: 2, name: "Bob Smith", email: "bob@example.com" },
	{ id: 3, name: "Carol White", email: "carol@example.com" },
	{ id: 4, name: "David Brown", email: "david@example.com" },
	{ id: 5, name: "Eva Martinez", email: "eva@example.com" },
];

const searchResults = ref([]);

// Mock product data
const mockProducts = [
	{
		id: 1,
		name: "Wireless Mouse",
		price: 29.99,
		category: "electronics",
		inStock: true,
		onSale: false,
	},
	{
		id: 2,
		name: "Mechanical Keyboard",
		price: 89.99,
		category: "electronics",
		inStock: true,
		onSale: true,
	},
	{
		id: 3,
		name: "Cotton T-Shirt",
		price: 19.99,
		category: "clothing",
		inStock: true,
		onSale: false,
	},
	{
		id: 4,
		name: "Programming Book",
		price: 39.99,
		category: "books",
		inStock: false,
		onSale: false,
	},
	{
		id: 5,
		name: "USB-C Cable",
		price: 12.99,
		category: "electronics",
		inStock: true,
		onSale: true,
	},
];

const productResults = ref([]);
const filters = reactive({
	inStock: false,
	onSale: false,
	category: "",
});

// Search handlers
const handleSearch = (query) => {
	if (!query || query.length < 2) {
		searchResults.value = [];
		return;
	}

	// Simulate search with delay
	setTimeout(() => {
		searchResults.value = mockUsers.filter(
			(user) =>
				user.name.toLowerCase().includes(query.toLowerCase()) ||
				user.email.toLowerCase().includes(query.toLowerCase()),
		);
	}, 300);
};

const handleAdvancedSearch = (query) => {
	if (!query) {
		productResults.value = [];
		return;
	}

	setTimeout(() => {
		let results = mockProducts.filter((product) =>
			product.name.toLowerCase().includes(query.toLowerCase()),
		);

		// Apply filters
		if (filters.inStock) {
			results = results.filter((p) => p.inStock);
		}
		if (filters.onSale) {
			results = results.filter((p) => p.onSale);
		}
		if (filters.category) {
			results = results.filter((p) => p.category === filters.category);
		}

		productResults.value = results;
	}, 300);
};

// Scroll to section
const scrollToSection = (sectionId) => {
	const element = document.getElementById(sectionId);
	if (element) {
		element.scrollIntoView({ behavior: "smooth" });
	}
};
</script>

<style scoped>
.app {
	max-width: 1200px;
	margin: 0 auto;
	padding: 1.5rem 2rem;
	font-family:
		-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* Header */
.header {
	text-align: center;
	margin-bottom: 2rem;
}

.header h1 {
	color: #081130;
	margin-bottom: 0.5rem;
	font-size: 2rem;
}

.header p {
	color: #636e85;
	font-size: 1rem;
	margin-bottom: 1rem;
}

.header-links {
	display: flex;
	justify-content: center;
	gap: 1.5rem;
}

.header-links a {
	color: #1a2a6c;
	text-decoration: none;
	font-weight: 500;
}

.header-links a:hover {
	text-decoration: underline;
}

/* Pattern Navigation */
.pattern-nav {
	background: #ffffff;
	padding: 2rem;
	border-radius: 0.5rem;
	border: 1px solid #d0d5e0;
	margin-bottom: 2rem;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.pattern-nav h2 {
	color: #081130;
	margin: 0 0 1.5rem 0;
	font-size: 1.5rem;
	padding-bottom: 0.5rem;
}

.pattern-list {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1rem;
}

.pattern-item {
	display: flex;
	align-items: center;
	gap: 1rem;
	padding: 1rem;
	background: #f5f7fa;
	border-radius: 0.5rem;
	border: 1px solid #d0d5e0;
	cursor: pointer;
	transition: all 0.2s;
}

.pattern-item:hover {
	background: #d0d5e0;
	transform: translateX(4px);
}

.pattern-icon {
	font-size: 2rem;
}

.pattern-info {
	flex: 1;
}

.pattern-info h3 {
	color: #081130;
	margin: 0 0 0.25rem 0;
	font-size: 1rem;
}

.pattern-info p {
	color: #3d4663;
	margin: 0;
	font-size: 0.9rem;
}

.pattern-arrow {
	color: #1a2a6c;
	font-size: 1.5rem;
}

/* Main Content */
.main {
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
}

/* Pattern Sections */
.pattern-section {
	position: relative;
	display: grid;
	grid-template-columns: 1fr;
	gap: 1.5rem;
}

/* Demo blocks - multi-column on wide screens */
@media (min-width: 1024px) {
	/* Token Override: 1 FKUI reference + 2 EHMDS demos */
	#token-override {
		grid-template-columns: repeat(2, 1fr);
	}

	/* Wrapper: 1 FKUI reference + 2 EHMDS demos */
	#wrapper {
		grid-template-columns: repeat(2, 1fr);
	}

	/* Extension: 1 FKUI reference + 3 EHMDS demos */
	#extension {
		grid-template-columns: repeat(2, 1fr);
	}

	/* Composition: 1 FKUI reference + 2 EHMDS demos */
	#composition {
		grid-template-columns: repeat(2, 1fr);
	}
}

/* Code block and FKUI reference should always span full width */
.pattern-section > .code-block,
.pattern-section > .fkui-reference {
	grid-column: 1 / -1;
}

.pattern-header {
	margin-bottom: 2rem;
	grid-column: 1 / -1;
}

.pattern-header h2 {
	color: #081130;
	margin: 0.5rem 0;
	font-size: 2rem;
}

.pattern-description {
	color: #3d4663;
	font-size: 1rem;
	line-height: 1.6;
	max-width: 800px;
}

.pattern-description code {
	background: #edf0f5;
	padding: 0.125rem 0.375rem;
	border-radius: 0.25rem;
	font-family: "Monaco", "Consolas", monospace;
	font-size: 0.9em;
}

.pattern-docs-link {
	display: inline-block;
	margin-top: 0.5rem;
	color: #1a2a6c;
	text-decoration: none;
	font-weight: 500;
}

.pattern-docs-link:hover {
	text-decoration: underline;
}

/* Demo Blocks */
.demo-block {
	background: #ffffff;
	padding: 1.5rem;
	border-radius: 0.5rem;
	border: 1px solid #b0b8c9;
}

/* FKUI Reference Blocks */
.fkui-reference {
	background: #edf0f5;
	border: 1px dashed #8892a6;
}

.fkui-reference__tag {
	display: inline-block;
	background: #edf0f5;
	color: #081130;
	font-size: 0.7rem;
	font-weight: 700;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	padding: 0.2rem 0.5rem;
	border-radius: 4px;
	margin-bottom: 0.5rem;
}

.fkui-reference h3 {
	color: #081130;
}

.fkui-reference__note {
	color: #636e85;
	font-size: 0.85rem;
	margin: 0 0 1rem 0;
}

.fkui-reference__btn {
	padding: 0.375rem 0.75rem;
	font-size: 0.875rem;
	background: #edf0f5;
	color: #3d4663;
	border: 1px solid #b0b8c9;
	border-radius: 4px;
	cursor: pointer;
}

.fkui-reference__btn:hover {
	background: #b0b8c9;
}

.fkui-search-reference {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.fkui-search-reference > :deep(.text-field) {
	flex: 1;
}

.example-label {
	color: #3d4663;
	font-size: 0.75rem;
	font-weight: 600;
	letter-spacing: 0.05em;
	text-transform: uppercase;
}

.demo-block .example-label {
	display: block;
	padding: 0 0 0.5rem 0;
}

.demo-block h3 {
	display: inline-block;
	color: #081130;
	margin: 0 0 1rem 0;
	font-size: 1rem;
	font-weight: 600;
	letter-spacing: 0.025em;
}

.demo-row {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	align-items: center;
}

/* Cards */
.card-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	gap: 1.5rem;
}

/* Forms */
.form-grid {
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
}

/* Search Demo */
.search-demo {
	max-width: 600px;
}

.search-results {
	margin-top: 1rem;
	padding: 1rem;
	background: #f5f7fa;
	border-radius: 0.5rem;
	min-height: 60px;
}

.search-loading,
.search-empty {
	color: #3d4663;
	text-align: center;
}

.search-list,
.product-list {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.search-item,
.product-item {
	padding: 0.75rem;
	background: white;
	border-radius: 0.375rem;
	border: 1px solid #d0d5e0;
}

.product-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.product-name {
	font-weight: 500;
}

.product-price {
	color: #10b981;
	font-weight: 600;
}

.search-filters {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 1rem;
	background: #f5f7fa;
	border-radius: 0.5rem;
}

.filter-group {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.filter-group label {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	color: #081130;
}

.filter-group select {
	padding: 0.5rem;
	border: 1px solid #b0b8c9;
	border-radius: 0.25rem;
	background: white;
}

/* Code Block */
.code-block {
	padding: 1rem;
	background: #1e293b;
	border-radius: 0.5rem;
	overflow-x: auto;
}

.code-block pre {
	margin: 0;
	color: #edf0f5;
	font-family: "Monaco", "Consolas", monospace;
	font-size: 0.875rem;
	line-height: 1.5;
}

/* Comparison Table */
.comparison-section {
	background: #f5f7fa;
}

.comparison-table {
	width: 100%;
	border-collapse: collapse;
	background: white;
	border-radius: 0.5rem;
	overflow: hidden;
}

.comparison-table th,
.comparison-table td {
	padding: 1rem;
	text-align: left;
	border-bottom: 1px solid #d0d5e0;
}

.comparison-table th {
	background: #081130;
	color: white;
	font-weight: 600;
}

.comparison-table tr:last-child td {
	border-bottom: none;
}

.comparison-table tbody tr:hover {
	background: #f5f7fa;
}

/* Footer */
.footer {
	text-align: center;
	padding: 2rem 0;
	border-top: 1px solid #d0d5e0;
	margin-top: 3rem;
	color: #3d4663;
}

.footer p {
	margin: 0.5rem 0;
}

.footer a {
	color: #1a2a6c;
	text-decoration: none;
}

.footer a:hover {
	text-decoration: underline;
}

.footer span {
	margin: 0 0.5rem;
	color: #d0d5e0;
}

/* Toggle Button */
.toggle-button {
	padding: 0.375rem 0.75rem;
	font-size: 0.875rem;
	background: #1a2a6c;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	transition: background 0.2s;
}

.toggle-button:hover {
	background: #0f1a4a;
}

/* Responsive */
@media (max-width: 768px) {
	.app {
		padding: 1rem;
	}

	.header h1 {
		font-size: 2rem;
	}

	.card-grid {
		grid-template-columns: 1fr;
	}

	.pattern-item {
		flex-wrap: wrap;
	}

	.comparison-table {
		font-size: 0.875rem;
	}

	.comparison-table th,
	.comparison-table td {
		padding: 0.5rem;
	}
}
</style>

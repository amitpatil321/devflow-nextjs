<p align="center"><h1 align="center">DevOverflow - Nextjs</h1></p>

<img src="https://github.com/amitpatil321/devflow-nextjs/blob/main/devflow-score.png" />

<p align="center">
	<em>DevOverflow is a complete Q&A platform for developers to ask questions, share knowledge, and learn from each other. It is built with Next.js, Tailwind CSS, Clerk, MongoDB, and more.!</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/amitpatil321/devflow-nextjs?style=default&logo=opensourceinitiative&logoColor=white&color=ff7000" alt="license">
	<img src="https://img.shields.io/github/last-commit/amitpatil321/devflow-nextjs?style=default&logo=git&logoColor=white&color=ff7000" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/amitpatil321/devflow-nextjs?style=default&color=ff7000" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/amitpatil321/devflow-nextjs?style=default&color=ff7000" alt="repo-language-count">
</p>
<p align="center"><!-- default option, no dependency badges. -->
</p>
<p align="center">
	<!-- default option, no dependency badges. -->
</p>
<br>

##  Table of Contents

- [ Overview](#-overview)
- [ Features](#-features)
- [ Project Structure](#-project-structure)
  - [ Project Index](#-project-index)
- [ Getting Started](#-getting-started)
  - [ Prerequisites](#-prerequisites)
  - [ Installation](#-installation)
  - [ Usage](#-usage)
  - [ Testing](#-testing)
- [ Project Roadmap](#-project-roadmap)
- [ Contributing](#-contributing)
- [ License](#-license)
- [ Acknowledgments](#-acknowledgments)

---

##  Overview

Devflow-Next.js is a cutting-edge open-source project that streamlines Next.js development by configuring project settings for images, MDX rendering, and server components. Key features include support for remote image patterns, external packages, and enhanced TypeScript settings. Ideal for developers seeking efficient Next.js workflows with advanced features and modern JavaScript capabilities.

---

##  Features

|      | Feature         | Summary       |
| :--- | :---:           | :---          |
| ⚙️  | **Architecture**  | <ul><li>Primary Language: TypeScript</li><li>Dependencies: npm, javascript, package.json, components.json, tsconfig.json, css, typescript, package-lock.json, @hookform/resolvers, tailwindcss, @radix-ui/react-menubar, framer-motion, next-themes, @radix-ui/react-dialog, @radix-ui/react-tabs, @radix-ui/react-slot, @types/react-dom, query-string, globals, typescript-eslint, @types/react, @radix-ui/react-label, mongoose, react-hook-form, mongodb, @tinymce/tinymce-react, clsx, eslint, prettier-plugin-tailwindcss, tailwindcss-animate, zod, react-dom, html-react-parser, @tailwindcss/typography, tinymce, tailwind-merge, @types/prismjs, typescript, @radix-ui/react-icons, prettier, @types/node, react, @clerk/nextjs, @radix-ui/react-select, class-variance-authority, @eslint/js, next, sonner, eslint-plugin-react, prismjs, postcss, lucide-react, @radix-ui/react-toast, svix</li></ul> |
| 🔩 | **Code Quality**  | <ul><li>File Contents: next.config.mjs configures Next.js project settings for images and experimental features, including remote patterns for images and external packages for server components. Enables support for MDX rendering and specifies external packages like "mongoose." This file plays a crucial role in defining project configurations and enabling experimental features within the codebase architecture.</li></ul> |
| 📄 | **Documentation** | <ul><li>Primary Language: TypeScript</li><li>Language Counts: mjs (3), json (4), ts (22), tsx (70), css (3), js (1)</li><li>Package Managers: npm (package-lock.json, package.json)</li><li>Install Commands: npm install</li><li>Usage Commands: npm start</li><li>Test Commands: npm test</li></ul> |

---

##  Project Structure

```sh
└── devflow-nextjs/
    ├── README.md
    ├── app
    │   ├── (auth)
    │   ├── (root)
    │   ├── api
    │   ├── favicon.ico
    │   ├── fonts
    │   ├── globals.css
    │   └── layout.tsx
    ├── components
    │   ├── LeftSidebar.tsx
    │   ├── RightSidebar.tsx
    │   ├── cards
    │   ├── forms
    │   ├── home
    │   ├── shared
    │   ├── toastWrapper.tsx
    │   └── ui
    ├── components.json
    ├── constants
    │   ├── filters.ts
    │   ├── index.ts
    │   └── paths.js
    ├── context
    │   └── ThemeProvider.tsx
    ├── database
    │   ├── answer.model.ts
    │   ├── interaction.model.ts
    │   ├── question.model.ts
    │   ├── tag.model.ts
    │   └── user.model.ts
    ├── devflow-score.png
    ├── eslint.config.mjs
    ├── lib
    │   ├── actions
    │   ├── mongoose.ts
    │   ├── utils.tsx
    │   └── validations.ts
    ├── middleware.ts
    ├── next.config.mjs
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.mjs
    ├── public
    │   └── assets
    ├── styles
    │   ├── prism.css
    │   └── theme.css
    ├── tailwind.config.ts
    ├── tsconfig.json
    └── types
        └── index.d.ts
```


###  Project Index
<details open>
	<summary><b><code>DEVFLOW-NEXTJS/</code></b></summary>
	<details> <!-- __root__ Submodule -->
		<summary><b>__root__</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/next.config.mjs'>next.config.mjs</a></b></td>
				<td>- Configures Next.js project settings for images and experimental features, including remote patterns for images and external packages for server components<br>- Enables support for MDX rendering and specifies external packages like "mongoose." This file plays a crucial role in defining project configurations and enabling experimental features within the codebase architecture.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/package-lock.json'>package-lock.json</a></b></td>
				<td>- The `package-lock.json` file in the project structure defines the dependencies and their versions required for the "devflow" project<br>- It ensures that the project uses specific versions of packages like "@clerk/nextjs", "@hookform/resolvers", "@radix-ui/react-dialog", "@radix-ui/react-icons", "@radix-ui/react-label", and "@radix-ui/react-menubar"<br>- This file plays a crucial role in maintaining consistency and reproducibility in the project's development environment by locking the dependency versions.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/tsconfig.json'>tsconfig.json</a></b></td>
				<td>Configure TypeScript settings for Next.js project to enable modern JavaScript features and improve type safety.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/eslint.config.mjs'>eslint.config.mjs</a></b></td>
				<td>- Define ESLint configuration for JavaScript, TypeScript, and React in the project<br>- Import plugins and globals, set language options, and define rules to ensure consistent code quality across various file types.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/middleware.ts'>middleware.ts</a></b></td>
				<td>- Implements middleware for protecting specific routes based on authentication status<br>- Uses Clerk for authentication and route matching<br>- Configured to skip Next.js internals and static files, except when in search params, and always run for API routes<br>- Enhances project security by ensuring protected routes are only accessible to authenticated users.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/postcss.config.mjs'>postcss.config.mjs</a></b></td>
				<td>Defines PostCSS configuration with TailwindCSS plugin for the project's styling needs.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/package.json'>package.json</a></b></td>
				<td>Define project dependencies and scripts for building, running, and linting.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components.json'>components.json</a></b></td>
				<td>- Defines project configuration for styles, resources, and aliases<br>- Specifies Tailwind CSS settings, file paths, and module aliases for components, utilities, and hooks<br>- Facilitates consistent styling and easy module imports across the codebase.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/tailwind.config.ts'>tailwind.config.ts</a></b></td>
				<td>- Define Tailwind CSS configuration for project theming, typography, and animations<br>- Customize colors, fonts, border radii, and box shadows<br>- Set up responsive breakpoints and background images<br>- Enable dark mode with class-based toggling<br>- Organize content from pages, components, and app directories<br>- Integrate Tailwind plugins for animations and typography.</td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- types Submodule -->
		<summary><b>types</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/types/index.d.ts'>index.d.ts</a></b></td>
				<td>Defines interfaces for sidebar links, tags, badge counts, and criteria types within the project architecture.</td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- lib Submodule -->
		<summary><b>lib</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/lib/validations.ts'>validations.ts</a></b></td>
				<td>- Define validation schemas for asking questions, answering, and profile information using Zod in lib/validations.ts<br>- Ensure titles, explanations, tags, answers, names, usernames, bios, portfolio websites, and locations meet specified criteria.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/lib/mongoose.ts'>mongoose.ts</a></b></td>
				<td>Establish database connection using Mongoose, handling potential errors based on connection issues.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/lib/utils.tsx'>utils.tsx</a></b></td>
				<td>- The code file in lib/utils.tsx provides utility functions for handling common tasks like formatting numbers, calculating time differences, and managing URL parameters<br>- It also includes a function to assign badges based on specified criteria<br>- These functions contribute to enhancing the user experience and data presentation within the project's architecture.</td>
			</tr>
			</table>
			<details>
				<summary><b>actions</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/lib/actions/interaction.action.ts'>interaction.action.ts</a></b></td>
						<td>- Improve user engagement by updating question views and tracking interactions in the database<br>- The code in the provided file handles viewing questions, increments view count, and records user interactions if applicable<br>- It ensures data integrity and enhances user experience within the project's architecture.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/lib/actions/general.action.ts'>general.action.ts</a></b></td>
						<td>- The code in lib/actions/general.action.ts performs a global search across different data collections based on the provided type and query<br>- It retrieves relevant results from questions, answers, users, and tags, applying search filters and limits<br>- The function handles various search scenarios and formats the results for each data type accordingly.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/lib/actions/answer.action.ts'>answer.action.ts</a></b></td>
						<td>- Manages creation, retrieval, upvoting, downvoting, and deletion of answers, updating user reputation accordingly<br>- Handles database interactions for answers, questions, users, and interactions<br>- Maintains answer-question relationships and triggers cache revalidation.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/lib/actions/shared.types.d.ts'>shared.types.d.ts</a></b></td>
						<td>- Defines shared types for various actions in the project, such as creating, updating, and deleting user-related data, managing questions and answers, handling user profiles, and performing searches<br>- These types ensure consistency and clarity across different parts of the codebase, facilitating seamless communication and interaction between components.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/lib/actions/tag.action.ts'>tag.action.ts</a></b></td>
						<td>- Implement functions to retrieve and manipulate tag data, including fetching top interacted tags, all tags with search and filter options, questions by tag ID, and top popular tags<br>- Functions handle database connections, error handling, and data aggregation for efficient tag-related operations within the project architecture.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/lib/actions/job.action.ts'>job.action.ts</a></b></td>
						<td>- The code file `job.action.ts` in the project is responsible for handling job search actions<br>- It imports constants related to job search APIs and defines types for job search properties<br>- The file likely contains functions or logic to interact with the job search API and process the retrieved data<br>- This code plays a crucial role in enabling users to search for specific job listings based on various parameters such as location, job title, and employment type within the application.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/lib/actions/user.action.ts'>user.action.ts</a></b></td>
						<td>- Provides functions to manage user data such as creating, updating, and deleting users, fetching user information, questions, and answers<br>- Implements user-related operations like saving questions, assigning badges, and updating user profiles<br>- Handles database interactions for user-specific actions within the project's architecture.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/lib/actions/question.action.ts'>question.action.ts</a></b></td>
						<td>- The code file orchestrates interactions with questions in the database, enabling actions like retrieving, creating, updating, and deleting questions<br>- It also supports functionalities such as upvoting, downvoting, and fetching recommended questions based on user interactions<br>- This file plays a crucial role in managing the core question-related operations within the project architecture.</td>
					</tr>
					</table>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<details> <!-- styles Submodule -->
		<summary><b>styles</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/styles/prism.css'>prism.css</a></b></td>
				<td>- Define the color scheme and styling for code syntax highlighting in the project's Prism theme<br>- Set font styles, colors, and backgrounds for different code elements to enhance readability and visual appeal.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/styles/theme.css'>theme.css</a></b></td>
				<td>- Define global styles for light and dark themes using Tailwind CSS utility classes<br>- Include background colors, text styles, borders, typography, shadows, gradients, and more<br>- Ensure consistent design across the project with predefined styling options.</td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- components Submodule -->
		<summary><b>components</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/toastWrapper.tsx'>toastWrapper.tsx</a></b></td>
				<td>Defines a component that manages toast notifications' position based on the viewport size, enhancing user experience by ensuring optimal visibility.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/RightSidebar.tsx'>RightSidebar.tsx</a></b></td>
				<td>- Generates dynamic content for the right sidebar displaying top questions and popular tags by fetching data asynchronously<br>- Utilizes Next.js for server-side rendering and efficient image loading<br>- Enhances user experience with interactive links and tag components.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/LeftSidebar.tsx'>LeftSidebar.tsx</a></b></td>
				<td>- Generates the left sidebar navigation with user authentication handling and dynamic routing based on the current pathname<br>- Displays sidebar links with corresponding icons and labels, adjusting the route for the profile link if a user is authenticated<br>- Includes sign-in and sign-up buttons for users not logged in.</td>
			</tr>
			</table>
			<details>
				<summary><b>shared</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/shared/AnswersTab.tsx'>AnswersTab.tsx</a></b></td>
						<td>- Generates user answers tab with pagination and no results display<br>- Retrieves user answers based on search parameters and displays them using AnswerCard component<br>- If no answers, prompts user to contribute<br>- Allows seamless navigation through pagination.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/shared/QuestionTab.tsx'>QuestionTab.tsx</a></b></td>
						<td>- Generates a user-specific question tab displaying questions with pagination<br>- Retrieves user questions, presents them using QuestionCard components, and handles cases with no results<br>- Encourages user engagement by prompting to ask questions<br>- Facilitates seamless navigation through questions with pagination functionality.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/shared/NoResults.tsx'>NoResults.tsx</a></b></td>
						<td>- Render a component displaying a message with an illustration, title, description, and a button linking to a specified URL<br>- The component enhances user experience by providing a visually appealing and interactive way to handle scenarios with no search results.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/shared/Metric.tsx'>Metric.tsx</a></b></td>
						<td>- Defines a reusable Metric component for displaying data with images, values, and titles<br>- Handles optional links and author-specific styling.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/shared/ListAnswers.tsx'>ListAnswers.tsx</a></b></td>
						<td>- Generates a list of answers for a given question, displaying author details, voting options, and answer content<br>- Includes filters for answer sorting and a time ago feature.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/shared/Pagination.tsx'>Pagination.tsx</a></b></td>
						<td>- Implements a dynamic pagination component that enables users to navigate through content efficiently based on the total number of items<br>- It integrates with the project's UI components and utilizes Next.js routing for seamless page transitions<br>- The component adjusts the display based on the current page and total pages, enhancing the user experience within the application.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/shared/Stats.tsx'>Stats.tsx</a></b></td>
						<td>- The Stats component renders statistics including total questions, answers, and badges<br>- It utilizes StatsCard to display badge counts with corresponding icons<br>- The component structure is clean and modular, enhancing code readability and maintainability within the project architecture.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/shared/NoResult.tsx'>NoResult.tsx</a></b></td>
						<td>- Render a component displaying a message with an illustration, title, description, and a button linking to a specified URL<br>- The component is designed to handle scenarios where no search results are found, providing a visually appealing and user-friendly interface for users to navigate.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/shared/EditDeleteActions.tsx'>EditDeleteActions.tsx</a></b></td>
						<td>- Implements Edit and Delete actions for questions and answers, allowing users to modify or remove content<br>- Handles routing and deletion requests, providing visual feedback upon successful deletion<br>- Integrates with the project's navigation and API actions to ensure a seamless user experience.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/shared/Votes.tsx'>Votes.tsx</a></b></td>
						<td>- Enables users to interact with questions and answers by upvoting, downvoting, and saving them<br>- Handles user authentication and displays vote counts visually<br>- Supports actions like viewing questions, toggling saves, and providing feedback messages<br>- Enhances user engagement and feedback within the platform.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/shared/Filters.tsx'>Filters.tsx</a></b></td>
						<td>- Implements a dynamic filtering component for the UI, allowing users to select and apply filters to the displayed content<br>- The component interacts with the URL to update the filter state and trigger relevant content updates.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/shared/ParseHTML.tsx'>ParseHTML.tsx</a></b></td>
						<td>- ParseHTML component enhances user experience by rendering HTML content with syntax highlighting using Prism<br>- It integrates with React to parse and display structured data efficiently<br>- This component plays a crucial role in presenting dynamic content in a visually appealing and readable format within the project architecture.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/shared/ProfileLink.tsx'>ProfileLink.tsx</a></b></td>
						<td>- Enables rendering a profile link with an image and title, supporting optional external URLs<br>- The component leverages Next.js for image optimization and routing, enhancing user experience and visual appeal.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/shared/RenderTag.tsx'>RenderTag.tsx</a></b></td>
						<td>- Defines a reusable component for rendering tags with optional question count display<br>- Links to tag details and displays tag name with count if specified.</td>
					</tr>
					</table>
					<details>
						<summary><b>navbar</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/shared/navbar/ThemeSwitcher.tsx'>ThemeSwitcher.tsx</a></b></td>
								<td>- Implements a theme switcher component for the navbar, allowing users to toggle between light and dark themes<br>- The component integrates with the project's theme provider context and displays theme options with corresponding icons.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/shared/navbar/NavBar.tsx'>NavBar.tsx</a></b></td>
								<td>- Defines the navigation bar component for the project, incorporating features like site logo, global search, theme switcher, user authentication, and mobile navigation<br>- The component ensures a cohesive and user-friendly interface for seamless navigation and interaction within the application.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/shared/navbar/MobileNav.tsx'>MobileNav.tsx</a></b></td>
								<td>- MobileNav component renders a responsive navigation menu with a collapsible sidebar on mobile devices<br>- It integrates with the UI components for a seamless user experience, displaying links based on the current page<br>- The component also includes sign-in and sign-up buttons for users not logged in.</td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>search</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/shared/search/GlobalFilters.tsx'>GlobalFilters.tsx</a></b></td>
								<td>- GlobalFilters component manages search filters for different types in the project, allowing users to filter content by question, answer, user, or tag<br>- It updates the URL based on the selected type, providing a seamless filtering experience.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/shared/search/GlobalSearch.tsx'>GlobalSearch.tsx</a></b></td>
								<td>- Enables global search functionality with dynamic URL updates and interactive search results display<br>- Manages user input, URL navigation, and result presentation for a seamless search experience<br>- Integrates with Next.js routing and Framer Motion for smooth transitions.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/shared/search/GlobalResult.tsx'>GlobalResult.tsx</a></b></td>
								<td>- Generates global search results with dynamic filtering and navigation links based on user queries<br>- Displays loading indicators and handles empty result scenarios gracefully<br>- Integrates with external APIs for fetching and rendering data efficiently<br>- Enhances user experience by providing a seamless search experience within the application.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/shared/search/LocalSearch.tsx'>LocalSearch.tsx</a></b></td>
								<td>- Enables dynamic search functionality with URL updates based on user input<br>- Handles search term changes, updates URL parameters, and triggers navigation without page reload<br>- Integrates search icon positioning and styling flexibility for enhanced user experience within the shared components of the project architecture.</td>
							</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<details>
				<summary><b>cards</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/cards/UserCard.tsx'>UserCard.tsx</a></b></td>
						<td>- Generates a user card displaying profile information and top interacted tags<br>- The card includes the user's name, username, profile picture, and a list of tags based on user interactions<br>- Clicking on the card redirects to the user's profile page.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/cards/JobCard.tsx'>JobCard.tsx</a></b></td>
						<td>- Generates job cards displaying key details like job title, employer info, location, and salary<br>- Includes links for applying and employer websites<br>- Utilizes Next.js Image component for logos and flags<br>- Enhances user experience by providing concise job information and easy navigation to job listings.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/cards/QuestionCard.tsx'>QuestionCard.tsx</a></b></td>
						<td>- Generates a Question Card component displaying question details, author info, tags, upvotes, views, and answers<br>- Includes actions for the author to edit or delete the question<br>- Utilizes paths, time formatting, and utility functions for a dynamic user experience.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/cards/AnswerCard.tsx'>AnswerCard.tsx</a></b></td>
						<td>- Generates AnswerCard component displaying answer details, author info, and actions<br>- Renders question title, author name, upvotes count, and creation time<br>- Allows authors to edit or delete their answers<br>- Enhances user engagement and interaction within the project's Q&A feature.</td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>forms</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/forms/Question.tsx'>Question.tsx</a></b></td>
						<td>- The code file `Question.tsx` in the `forms` component handles the creation and editing of questions, including title, explanation, and tags<br>- It integrates form validation, submission handling, and tag management<br>- The file encapsulates the logic for posting questions, updating existing ones, and rendering tags dynamically based on user input.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/forms/Answer.tsx'>Answer.tsx</a></b></td>
						<td>- Implement a React component named Answer that enables users to submit answers to questions<br>- It integrates with an external AI service to generate answers automatically<br>- The component includes a rich text editor for composing answers, form validation, and submission handling<br>- Users can also trigger the AI answer generation feature.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/forms/Profile.tsx'>Profile.tsx</a></b></td>
						<td>- Enables users to update their profile information seamlessly by providing a form with fields for name, username, portfolio link, location, and bio<br>- Upon submission, the data is validated and sent for updating the user profile, with success and error messages displayed accordingly<br>- This component integrates with various UI elements and validation schemas to enhance the user experience.</td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>home</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/home/HomeFilters.tsx'>HomeFilters.tsx</a></b></td>
						<td>- Implements dynamic filtering functionality for the home page using URL parameters<br>- Handles filter selection changes and updates the URL accordingly<br>- Displays filter buttons based on predefined filters, allowing users to toggle between them.</td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>ui</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/ui/sheet.tsx'>sheet.tsx</a></b></td>
						<td>- Facilitates creation of customizable modal sheets for UI components, including triggers, content, headers, footers, titles, and descriptions<br>- Manages sheet variants and animations based on specified side<br>- Enables seamless integration of Radix UI components for enhanced user experience.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/ui/badge.tsx'>badge.tsx</a></b></td>
						<td>- Implements a Badge component with variant styles for UI elements<br>- The component utilizes class variance authority to manage different visual styles based on the specified variant<br>- This promotes reusability and consistency in styling across the project's UI components.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/ui/pagination.tsx'>pagination.tsx</a></b></td>
						<td>- The Pagination component in the UI module facilitates navigation between pages, offering components like Previous, Next, and Ellipsis for enhanced user experience<br>- It abstracts away pagination logic, promoting reusability and maintainability across the codebase architecture.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/ui/label.tsx'>label.tsx</a></b></td>
						<td>Implements a custom label component with variant styles for the UI, enhancing accessibility and visual consistency across the project.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/ui/input.tsx'>input.tsx</a></b></td>
						<td>Defines a reusable React input component with customizable styling and functionality, enhancing user input experience across the project.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/ui/textarea.tsx'>textarea.tsx</a></b></td>
						<td>Enables the creation of customizable text areas for user input within the UI components, ensuring consistent styling and functionality across the project.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/ui/form.tsx'>form.tsx</a></b></td>
						<td>- Facilitates form creation and management within the UI components, offering reusable form elements like labels, controls, descriptions, and messages<br>- Enhances form handling by providing structured contexts for form fields, items, and associated functionalities<br>- Promotes consistency and efficiency in building interactive forms across the codebase.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/ui/select.tsx'>select.tsx</a></b></td>
						<td>- Improve user interface interactions by enhancing the select component with customizable styling and behavior<br>- This file defines various components like Select, SelectTrigger, SelectContent, and more, allowing for a flexible and interactive dropdown selection experience within the project's UI architecture.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/ui/button.tsx'>button.tsx</a></b></td>
						<td>- Defines button variants and props for a React component, enabling customization of button styles and sizes<br>- Facilitates the creation of versatile and visually appealing buttons within the project's UI components.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/ui/tabs.tsx'>tabs.tsx</a></b></td>
						<td>Define and export custom UI components for tabs functionality using Radix UI in the project architecture.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/ui/skeleton.tsx'>skeleton.tsx</a></b></td>
						<td>- Defines a reusable Skeleton component for displaying loading placeholders in the UI<br>- The component applies a pulsating animation and styling to mimic a loading state<br>- This aids in enhancing user experience by providing visual feedback during data fetching processes.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/ui/menubar.tsx'>menubar.tsx</a></b></td>
						<td>- Define and structure UI components for a menubar using Radix UI primitives<br>- Implement various elements like menus, triggers, items, separators, and shortcuts<br>- Facilitate easy customization and integration of menubar functionality within the project's user interface.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/components/ui/sonner.tsx'>sonner.tsx</a></b></td>
						<td>- Defines a custom Toaster component that integrates with the Next.js theme system and Sonner library<br>- The component enhances user experience by providing customizable toast notifications with dynamic theming support.</td>
					</tr>
					</table>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<details> <!-- constants Submodule -->
		<summary><b>constants</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/constants/filters.ts'>filters.ts</a></b></td>
				<td>- Defines various filters for different sections of the application, such as homepage, users, answers, questions, and tags<br>- These filters provide options for sorting and organizing content based on different criteria, enhancing user experience and content discoverability within the platform.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/constants/index.ts'>index.ts</a></b></td>
				<td>- Define constants and sidebar links for the project, including themes, job search API, items per page, and badge criteria<br>- These values are crucial for maintaining consistency and functionality across different parts of the application.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/constants/paths.js'>paths.js</a></b></td>
				<td>Define standardized paths for key features and pages in the project, ensuring consistent navigation and URL structure across the codebase.</td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- context Submodule -->
		<summary><b>context</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/context/ThemeProvider.tsx'>ThemeProvider.tsx</a></b></td>
				<td>- Manages theme settings and storage for the React app, ensuring persistence and synchronization across sessions<br>- The ThemeProvider component establishes a context for theme data and provides hooks for accessing and updating themes throughout the application<br>- This file plays a crucial role in maintaining consistent visual styling based on user preferences.</td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- app Submodule -->
		<summary><b>app</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/app/layout.tsx'>layout.tsx</a></b></td>
				<td>- Defines the root layout for the project, incorporating global styles and fonts<br>- Integrates theme and authentication providers, setting the stage for a consistent user experience across the platform.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/app/globals.css'>globals.css</a></b></td>
				<td>- Define global styles for the project, including color schemes, typography, and utility classes<br>- Implement Tailwind CSS utilities and custom styles for buttons, flex layouts, cards, and markdown elements<br>- Additionally, handle dark mode styling and scrollbar customization.</td>
			</tr>
			</table>
			<details>
				<summary><b>(auth)</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/app/(auth)/layout.tsx'>layout.tsx</a></b></td>
						<td>Defines the layout for the authentication pages, setting the title metadata and styling the main content area.</td>
					</tr>
					</table>
					<details>
						<summary><b>onboarding</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/app/(auth)/onboarding/page.tsx'>page.tsx</a></b></td>
								<td>- Defines an onboarding page that fetches user data and prompts profile completion<br>- If user is not onboarded, redirects to the homepage.</td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>sign-in</b></summary>
						<blockquote>
							<details>
								<summary><b>[[...sign-in]]</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/app/(auth)/sign-in/[[...sign-in]]/page.tsx'>page.tsx</a></b></td>
										<td>Enables user sign-in functionality using the Clerk SDK within the authentication section of the project.</td>
									</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<details>
						<summary><b>sign-up</b></summary>
						<blockquote>
							<details>
								<summary><b>[[...sign-up]]</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/app/(auth)/sign-up/[[...sign-up]]/page.tsx'>page.tsx</a></b></td>
										<td>Enables user sign-up functionality using the Clerk SDK within the app's authentication module.</td>
									</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<details>
				<summary><b>(root)</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/app/(root)/layout.tsx'>layout.tsx</a></b></td>
						<td>- Defines the overall layout structure of the project, including the main content area and sidebars<br>- Renders the navigation bar, left and right sidebars, and a toaster wrapper for notifications<br>- Maintains a clean and organized user interface by structuring the components in a visually appealing manner.</td>
					</tr>
					</table>
					<details>
						<summary><b>profile</b></summary>
						<blockquote>
							<details>
								<summary><b>edit</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/app/(root)/profile/edit/page.tsx'>page.tsx</a></b></td>
										<td>- Enables editing user profiles securely by fetching user data and rendering the profile edit page<br>- Handles user authentication and redirects unauthorized users<br>- Displays the user's profile information for editing.</td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>[id]</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/app/(root)/profile/[id]/page.tsx'>page.tsx</a></b></td>
										<td>- Generates a user profile page displaying user information, stats, and tabs for top posts and answers<br>- Retrieves user data, including picture, name, bio, and joined date<br>- Allows users to edit their profiles if authenticated<br>- Displays user stats like reputation, question count, answer count, and badges<br>- Implements tabs for top posts and answers with corresponding components.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/app/(root)/profile/[id]/loading.tsx'>loading.tsx</a></b></td>
										<td>Generates a loading skeleton for profile data display, enhancing user experience by providing visual feedback during content loading.</td>
									</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<details>
						<summary><b>tags</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/app/(root)/tags/page.tsx'>page.tsx</a></b></td>
								<td>- Generates a page displaying tags with search, filters, and pagination functionalities<br>- Retrieves tags data and renders tag cards with question counts<br>- Handles cases where no tags are found, providing a prompt to ask a question<br>- Designed for the Dev Overflow platform, enhancing user experience in exploring and interacting with tags.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/app/(root)/tags/loading.tsx'>loading.tsx</a></b></td>
								<td>Generates loading skeleton UI for tags section, enhancing user experience by providing visual feedback while content loads.</td>
							</tr>
							</table>
							<details>
								<summary><b>[id]</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/app/(root)/tags/[id]/page.tsx'>page.tsx</a></b></td>
										<td>- Generates metadata and renders tag-specific questions with pagination and search functionality<br>- Displays tag name, question cards, and prompts users to ask questions if no results are found<br>- Enhances user engagement and navigation within the application.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/app/(root)/tags/[id]/loading.tsx'>loading.tsx</a></b></td>
										<td>Generates loading skeleton components to enhance user experience during data fetching.</td>
									</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<details>
						<summary><b>collections</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/app/(root)/collections/page.tsx'>page.tsx</a></b></td>
								<td>- The code file in app/(root)/collections/page.tsx orchestrates the display of saved questions, leveraging filters, search functionality, and pagination<br>- It interacts with user actions to fetch and present relevant data, ensuring a seamless user experience within the Dev Overflow collections section.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/app/(root)/collections/loading.tsx'>loading.tsx</a></b></td>
								<td>Generates loading skeleton components to display while fetching data, enhancing user experience by providing visual feedback during loading times.</td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>question</b></summary>
						<blockquote>
							<details>
								<summary><b>edit</b></summary>
								<blockquote>
									<details>
										<summary><b>[id]</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/app/(root)/question/edit/[id]/page.tsx'>page.tsx</a></b></td>
												<td>- Enables editing of a question by fetching user and question data, ensuring user authentication, and rendering the question form for editing<br>- The page displays the question title and form fields pre-filled with existing data for modification.</td>
											</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<details>
								<summary><b>[id]</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/app/(root)/question/[id]/page.tsx'>page.tsx</a></b></td>
										<td>- Generates metadata for a question page by fetching question details and user information<br>- Displays author info, voting options, question title, metrics, content, tags, answers, and an answer form<br>- Enhances user engagement and interaction on the platform.</td>
									</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<details>
						<summary><b>jobs</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/app/(root)/jobs/page.tsx'>page.tsx</a></b></td>
								<td>- Defines a page displaying job listings with search and filter functionality<br>- Retrieves job data based on search parameters, including query, filters, and page number<br>- Renders job cards if data is available; otherwise, displays a message<br>- Integrates search, filters, and error handling for a seamless user experience within the job listings section of the project.</td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>(home)</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/app/(root)/(home)/page.tsx'>page.tsx</a></b></td>
								<td>- Generates the home page content by fetching and displaying questions based on user filters<br>- Includes search functionality, question cards, pagination, and login prompts<br>- Integrates with Next.js, Clerk, and custom components for a seamless user experience.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/app/(root)/(home)/loading.tsx'>loading.tsx</a></b></td>
								<td>- Generates a loading screen with a title, "All Questions," and an "Ask a Question" button<br>- Displays multiple skeleton loading animations for content placeholders.</td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>community</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/app/(root)/community/page.tsx'>page.tsx</a></b></td>
								<td>- Generates the community page displaying all users with search, filters, and pagination functionalities<br>- Fetches users based on search parameters and renders UserCards<br>- Handles cases where no users are found, prompting users to sign up<br>- Overall, provides a comprehensive view of community members and encourages user engagement.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/app/(root)/community/loading.tsx'>loading.tsx</a></b></td>
								<td>Render a loading screen with skeleton components to display while fetching user data, enhancing user experience by providing visual feedback during the loading process.</td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>ask-question</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/app/(root)/ask-question/page.tsx'>page.tsx</a></b></td>
								<td>- Enables users to ask questions by ensuring authentication and fetching user data before rendering the question form<br>- The code file orchestrates the process of verifying user identity, retrieving user information, and presenting the question form within the Dev Overflow platform.</td>
							</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<details>
				<summary><b>api</b></summary>
				<blockquote>
					<details>
						<summary><b>chatGPT</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/app/api/chatGPT/route.ts'>route.ts</a></b></td>
								<td>- Handle POST requests to the chatGPT API endpoint by validating and processing user questions, then generating AI responses using the GPT-3.5 model<br>- The code interacts with the OpenAI API, authenticating with a provided key and sending user queries for AI completion<br>- Responses are parsed and returned to the client for seamless chat interactions.</td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>webhooks</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/app/api/webhooks/route.ts'>route.ts</a></b></td>
								<td>- Handles incoming webhooks from Clerk API, verifying and processing user creation, update, or deletion events<br>- Utilizes Svix for webhook verification and interacts with user actions for database operations<br>- Parses webhook payload, performs actions based on event type, and returns appropriate responses<br>- Ensures secure and reliable webhook processing within the application architecture.</td>
							</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<details> <!-- database Submodule -->
		<summary><b>database</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/database/interaction.model.ts'>interaction.model.ts</a></b></td>
				<td>- Defines the schema for user interactions in the database using Mongoose<br>- It includes fields for user, action, question, answer, tags, and creation timestamp<br>- The schema is used to create a model for interactions, ensuring data consistency and structure within the application's database.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/database/user.model.ts'>user.model.ts</a></b></td>
				<td>- Defines the user model schema for the database, including fields like name, email, and reputation<br>- Ensures uniqueness for certain fields and sets default values where needed<br>- Establishes relationships with other entities through references<br>- Overall, this code file structures and represents user data within the project's database architecture.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/database/question.model.ts'>question.model.ts</a></b></td>
				<td>- Defines a MongoDB schema for questions in the Q&A platform, including fields like title, content, tags, views, upvotes, author, and answers<br>- It establishes relationships with other entities like tags, users, and answers<br>- The schema ensures structured data storage and retrieval for questions within the application.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/database/tag.model.ts'>tag.model.ts</a></b></td>
				<td>- Defines a Mongoose schema for tags with fields like name, description, questions, followers, and creation date<br>- It also exports the schema as a type and a model<br>- This file plays a crucial role in structuring and managing tag-related data within the project's database architecture.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/amitpatil321/devflow-nextjs/blob/master/database/answer.model.ts'>answer.model.ts</a></b></td>
				<td>Define and structure the Answer model schema using Mongoose, ensuring data integrity and relationships between Users, Questions, and Answers in the database.</td>
			</tr>
			</table>
		</blockquote>
	</details>
</details>

---
##  Getting Started

###  Prerequisites

Before getting started with devflow-nextjs, ensure your runtime environment meets the following requirements:

- **Programming Language:** TypeScript
- **Package Manager:** Npm


###  Installation

Install devflow-nextjs using one of the following methods:

**Build from source:**

1. Clone the devflow-nextjs repository:
```sh
❯ git clone https://github.com/amitpatil321/devflow-nextjs
```

2. Navigate to the project directory:
```sh
❯ cd devflow-nextjs
```

3. Install the project dependencies:

**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm install
```

**Create .env file**
```sh
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=Clerk publisher key
CLERK_SECRET_KEY=clerk secret key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

NEXT_PUBLIC_TINY_EDITOR_API_KEY=tine mce api key
MONGODB_URL=mongodb url

NEXT_CLERK_SVIX_SECRET=clerk secret

NEXT_PUBLIC_SERVER_API=http://localhost:3000/

CHATGPT_API_KEY=openapi api key

NEXT_PUBLIC_RAPID_API_KEY=rapid api key
NEXT_PUBLIC_RAPID_API_HOST=jsearch.p.rapidapi.com
```


###  Usage
Run devflow-nextjs using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm run start
```
##  Contributing

- **🐛 [Report Issues](https://github.com/amitpatil321/devflow-nextjs/issues)**: Submit bugs found or log feature requests for the `devflow-nextjs` project.
- **💡 [Submit Pull Requests](https://github.com/amitpatil321/devflow-nextjs/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/amitpatil321/devflow-nextjs
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/amitpatil321/devflow-nextjs/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=amitpatil321/devflow-nextjs">
   </a>
</p>
</details>

---

##  License

This project is protected under the [AGPL-3](https://choosealicense.com/licenses/agpl-3.0/) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/agpl-3.0/)) file.

---

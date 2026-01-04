document.addEventListener('DOMContentLoaded', () => {
    const projectTitleDisplay = document.getElementById('project-title-display');
    const projectDescription = document.getElementById('project-description');
    const journeyList = document.getElementById('journey-list');
    const assetsContainer = document.getElementById('assets-container');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const projectTitleMain = document.getElementById('project-title');

    const mainContent = document.getElementById('main-content');
    const noticeBoard = document.getElementById('notice-board');

    // Toggle Sidebar
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('closed');
        mainContent.classList.toggle('shrunk');
    });

    // Toggle Notice Board (Clicking the vertical tab)
    noticeBoard.querySelector('.notice-header').addEventListener('click', () => {
        // If it's closed (translateX 250px), we want to open it (translateX 0)
        // If it's open, we want to close it.
        // We can use a class 'open' or just check the transform.
        // Let's rely on class 'closed' being absent = open.
        // Initial state logic in CSS: transform 250px.
        // The previous code had it backwards or inconsistent.

        if (noticeBoard.classList.contains('active')) {
            noticeBoard.classList.remove('active');
            noticeBoard.style.transform = "translateX(250px)";
        } else {
            noticeBoard.classList.add('active');
            noticeBoard.style.transform = "translateX(0)";
        }
    });

    // Close button inside notice board
    noticeBoard.querySelector('.close-notice').addEventListener('click', (e) => {
        e.stopPropagation();
        noticeBoard.classList.remove('active');
        noticeBoard.style.transform = "translateX(250px)";
    });

    // Fetch Data
    fetch('./assets/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {
            renderProject(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            projectTitleDisplay.textContent = "Error loading project data.";
        });

    function renderProject(project) {
        // Set Project-level details
        document.title = project.title || "Deep Thought Project";
        projectTitleMain.textContent = project.title;
        projectTitleDisplay.textContent = project.title;
        projectDescription.innerHTML = project.description; // using innerHTML as description often has HTML tags

        // Populate Sidebar Journey Board (Tasks)
        journeyList.innerHTML = '';
        if (project.tasks && project.tasks.length > 0) {
            project.tasks.forEach(task => {
                const li = document.createElement('li');
                li.className = 'journey-item';

                // Task Title
                const titleSpan = document.createElement('span');
                titleSpan.textContent = task.task_title;
                titleSpan.style.fontWeight = "bold";
                li.appendChild(titleSpan);

                // Asset list for this task
                if (task.assets && task.assets.length > 0) {
                    const ul = document.createElement('ul');
                    task.assets.forEach(asset => {
                        const assetLi = document.createElement('li');
                        assetLi.textContent = asset.asset_title;
                        ul.appendChild(assetLi);
                    });
                    li.appendChild(ul);
                }

                journeyList.appendChild(li);
            });

            // For this challenge, we typically render the assets of the FIRST task in the main area
            renderTaskAssets(project.tasks[0]);
        }
    }

    function renderTaskAssets(task) {
        assetsContainer.innerHTML = ''; // clear

        task.assets.forEach(asset => {
            const card = document.createElement('article');
            card.className = 'asset-card';

            // Header
            const header = document.createElement('div');
            header.className = 'asset-header';
            header.innerHTML = `
                <span class="asset-title">${asset.asset_title}</span>
                <span class="info-icon">i</span>
            `;
            card.appendChild(header);

            // Description
            const descDiv = document.createElement('div');
            descDiv.className = 'asset-description-box';
            descDiv.innerHTML = `<strong>Description:</strong> ${asset.asset_description}`;
            card.appendChild(descDiv);

            // Content Body
            const contentDiv = document.createElement('div');
            contentDiv.className = 'asset-content';

            // Logic based on types
            if (asset.asset_content_type === 'video') {
                const videoContainer = document.createElement('div');
                videoContainer.className = 'video-container';
                videoContainer.innerHTML = `<iframe src="${asset.asset_content}" allowfullscreen></iframe>`;
                contentDiv.appendChild(videoContainer);
            }
            else if (asset.asset_content_type === 'threadbuilder') {
                contentDiv.appendChild(createThreadBuilder());
            }
            else if (asset.asset_content_type === 'article') {
                if (asset.asset_content && asset.asset_content.trim() !== '') {
                    // It might be a link or actual content. 
                    const articleContainer = document.createElement('div');
                    articleContainer.className = 'article-container';

                    // Simple editor mock
                    articleContainer.innerHTML = `
                        <div class="editor-toolbar">
                            <button>File</button>
                            <button>Edit</button>
                            <button>View</button>
                            <button>Insert</button>
                            <button>Format</button>
                            <button>Tools</button>
                        </div>
                        <textarea class="editor-area" placeholder="Write your article here..."></textarea>
                    `;

                    // If content is a URL, maybe add a read more link
                    if (asset.asset_content.startsWith('http')) {
                        const link = document.createElement('div');
                        link.style.padding = "1rem";
                        link.innerHTML = `<a href="${asset.asset_content}" target="_blank" class="blue-btn">Read More</a>`;
                        articleContainer.appendChild(link);
                    }

                    contentDiv.appendChild(articleContainer);
                }
            } else {
                contentDiv.innerHTML = `<div style="padding:1rem">Unknown content type: ${asset.asset_content_type}</div>`;
            }

            card.appendChild(contentDiv);
            assetsContainer.appendChild(card);
        });
    }

    function createThreadBuilder() {
        const container = document.createElement('div');
        container.className = 'thread-builder-container';

        container.innerHTML = `
            <div class="thread-header">
                <span class="thread-title-text" style="font-weight:700">Thread A</span>
                <i class="fa-solid fa-chevron-up thread-chevron"></i>
            </div>
            <div class="thread-content-body">
                <div class="thread-inputs">
                    <div class="input-group">
                        <label>Sub thread 1</label>
                        <textarea placeholder="Enter text here"></textarea>
                    </div>
                    <div class="input-group">
                        <label>Sub Interpretation 1</label>
                        <textarea placeholder="Enter text here"></textarea>
                    </div>
                </div>
                <div class="thread-actions">
                    <i class="fa-solid fa-lightbulb action-icon"></i>
                    <i class="fa-solid fa-message action-icon"></i>
                    <i class="fa-solid fa-question action-icon"></i>
                    <i class="fa-solid fa-spa action-icon"></i>
                </div>
                <div style="display:flex; gap:1rem; margin-bottom:1rem;">
                    <button class="select-category-btn">Select Categ <i class="fa-solid fa-chevron-down"></i></button>
                    <button class="select-process-btn">Select Proces <i class="fa-solid fa-chevron-down"></i></button>
                </div>
                <button class="blue-btn">+ Sub-thread</button>
                 <div class="input-group" style="margin-top:1rem;">
                        <label>Summary for Thread A</label>
                        <textarea placeholder="Enter text here"></textarea>
                </div>
            </div>
        `;

        // Logic for the "+ Sub-thread" button
        const addSubThreadBtn = container.querySelector('.blue-btn');
        const inputsContainer = container.querySelector('.thread-inputs');

        addSubThreadBtn.addEventListener('click', () => {
            const newGroup = document.createElement('div');
            newGroup.className = 'thread-inputs'; // Use same row class or create new one
            newGroup.style.marginTop = '1rem';
            newGroup.style.borderTop = '1px solid #eee';
            newGroup.style.paddingTop = '1rem';

            newGroup.innerHTML = `
                <div class="input-group">
                    <label>Sub thread ${inputsContainer.children.length + 1}</label>
                    <textarea placeholder="Enter text here"></textarea>
                </div>
                <div class="input-group">
                    <label>Sub Interpretation ${inputsContainer.children.length + 1}</label>
                    <textarea placeholder="Enter text here"></textarea>
                </div>
            `;
            // Insert before the actions actions or append to main list.
            // Actually let's just append to the content body before the actions, 
            // but the current structure has inputs -> actions -> buttons.
            // Let's reorganize to allow multiple rows.
            inputsContainer.appendChild(newGroup.children[0]);
            inputsContainer.appendChild(newGroup.children[1]);
        });

        // Toggle logic for this specific thread builder
        const header = container.querySelector('.thread-header');
        const body = container.querySelector('.thread-content-body');
        header.addEventListener('click', () => {
            body.style.display = body.style.display === 'none' ? 'block' : 'none';
            header.querySelector('.thread-chevron').classList.toggle('fa-chevron-down');
            header.querySelector('.thread-chevron').classList.toggle('fa-chevron-up');
        });

        return container;
    }

    // --- Extra Professional Touches ---

    // 1. Populate Notice Board with Mock Data
    const noticeContent = noticeBoard.querySelector('.notice-content');
    const notices = [
        { title: "New Assignment", desc: "Complete the 4SA Reflection by Friday." },
        { title: "Meeting Update", desc: "Team sync moved to 3 PM tomorrow." },
        { title: "System Maintenance", desc: "Platform will be down for 1 hour on Sunday." }
    ];

    // Clear initial content if any, keep it clean
    noticeContent.innerHTML = '';

    notices.forEach(notice => {
        const div = document.createElement('div');
        div.className = 'notice-item';
        div.innerHTML = `<strong>${notice.title}</strong><p>${notice.desc}</p>`;
        noticeContent.appendChild(div);
    });

    // 2. Submit Task Interaction (Toast)
    divSubmit = document.querySelector('.project-header');
    // Wait, the submit button is inside .project-header but might not be created yet? 
    // No, it's static HTML.
    const submitBtn = document.querySelector('.submit-task-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            showToast("Task Submitted Successfully!");
        });
    }

    function showToast(message) {
        let toast = document.querySelector('.toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
});

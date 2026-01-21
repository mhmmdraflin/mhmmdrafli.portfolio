-- Create Database
CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

-- 1. Profile Table
CREATE TABLE IF NOT EXISTS profile (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    tagline_part1 VARCHAR(255),
    tagline_part2 VARCHAR(255),
    about_text TEXT,
    avatar_url VARCHAR(255),
    cv_url VARCHAR(255),
    total_projects VARCHAR(50),
    certificates_count VARCHAR(50),
    tech_tools_count VARCHAR(50)
);

INSERT INTO profile (name, role, tagline_part1, tagline_part2, about_text, avatar_url, cv_url, total_projects, certificates_count, tech_tools_count) VALUES
('Muhammad Rafli Nurfathan', 'Mobile Developer Enthusiast', 'Muhammad Rafli Nurfathan', 'Mobile Developer Enthusiast', 'I am an Informatics student at Universitas Bhinneka Nusantara with expertise in Android app development using Kotlin and Java. I am passionate about building innovative and user-friendly mobile applications.', 'profile.jpg', 'Muhammad Rafli Nurfathan - Resume.pdf', '5+', '1', '10+');


-- 2. Experiences (Journey) Table
CREATE TABLE IF NOT EXISTS experiences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('education', 'experience') NOT NULL,
    title VARCHAR(255) NOT NULL,
    organization VARCHAR(255) NOT NULL,
    period VARCHAR(100) NOT NULL,
    is_current BOOLEAN DEFAULT FALSE,
    description TEXT,
    association VARCHAR(255),
    logo_url VARCHAR(255),
    tags JSON 
);

INSERT INTO experiences (type, title, organization, period, is_current, description, logo_url, tags) VALUES
-- Education
('education', 'Informatics', 'UBHINUS dh.STIKI', '2022 — 2026', TRUE, 'Currently pursuing Bachelor degree in Informatics, focusing on Mobile Application Development', 'ubhinus-logo.jpg', NULL),
('education', 'Mobile Development', 'Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka', 'Sep 2024 — Dec 2024', FALSE, 'Specialized in Android Development (Kotlin) and Clean Architecture, collaborating with ML and Cloud teams on a Capstone Project.', 'bangkit-logo.jpg', NULL),
('education', 'Saintek', 'MAN 2 Kutai Kartanegara', 'Apr 2019 — Mei 2022', FALSE, 'High school education with focus on Science and Technology (Saintek).', 'man2kukar-logo.jpg', NULL),

-- Experience
('experience', 'Laboratory Teaching Assistant Advanced Database', 'UBHINUS dh.STIKI', 'Aug 2025 — Jan 2026', FALSE, 'Teaching advanced data management techniques including complex query structures (CTE/Window Functions) as well as best practices in SQL database optimization and performance analysis.', 'ubhinus-dh-stiki-logo.jpg', '["Database", "Teaching", "Part-time"]'),
('experience', 'Laboratory Teaching Assistant Advanced Web Programming', 'UBHINUS dh.STIKI', 'Mar 2025 — Jul 2025', FALSE, 'Assisted in teaching Advanced Web Programming, a course focused on mastering Laravel and Livewire to build transactional web applications. Provided technical guidance from installation and configuration to developing interactive components without JavaScript, while also supporting students in backend integration, performance optimization, and building scalable, component-based web systems.', 'ubhinus-dh-stiki-logo.jpg', '["Laravel", "Livewire", "Web Development"]'),
('experience', 'Laboratory Teaching Assistant Web Programming', 'UBHINUS dh.STIKI', 'Sep 2024 — Feb 2025', FALSE, 'Assisted in teaching Web Programming I, a course covering the fundamentals of web development including HTML, CSS, and PHP. Supported students during lectures and lab sessions by troubleshooting coding issues, guiding them in understanding core concepts, and helping improve their problem-solving skills in web development.', 'ubhinus-dh-stiki-logo.jpg', '["HTML", "CSS", "PHP", "Teaching"]');

INSERT INTO experiences (type, title, organization, period, is_current, description, association, logo_url, tags) VALUES
('experience', 'Mobile Developer', 'CatLoris: Gamified Nutrition Tracker App', 'Oct 2024 — Dec 2024', FALSE, 'As the Mobile Developer for CatLoris, I executed the end-to-end development of this gamified calorie-tracking Android application, from designing and slicing high-fidelity UI components to implementing core functionalities. By integrating interactive elements like challenges and rewards, I transformed daily nutrition management into an engaging experience, ensuring seamless feature performance to help users effectively meet their calorie and macronutrient goals.', 'Associated with Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka', 'catloris-logo.jpg', '["Kotlin", "Android", "Gamification", "UI/UX"]');


-- 3. Skills (Ecosystem) Table
CREATE TABLE IF NOT EXISTS skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon_url VARCHAR(255) NOT NULL,
    color_class VARCHAR(50),
    img_class VARCHAR(100)
);

INSERT INTO skills (name, icon_url, color_class, img_class) VALUES
('Kotlin', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg', 'bg-purple-100', NULL),
('Java', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', 'bg-red-100', NULL),
('Swift', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg', 'bg-orange-100', NULL),
('SwiftUI', 'swiftui-logo.jpg', 'bg-blue-100', 'mix-blend-multiply rounded-[10px] object-cover'),
('Figma', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', 'bg-pink-100', NULL),
('Laravel', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg', 'bg-red-100', NULL),
('PHP', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', 'bg-indigo-100', NULL),
('HTML5', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', 'bg-orange-100', NULL),
('CSS3', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', 'bg-blue-100', NULL),
('MySQL', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', 'bg-cyan-100', NULL);


-- 4. Certificates Table
CREATE TABLE IF NOT EXISTS certificates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    issuer_lines JSON, 
    path_name VARCHAR(255),
    specialization VARCHAR(255),
    image_url VARCHAR(255)
);

INSERT INTO certificates (title, issuer_lines, path_name, specialization, image_url) VALUES
('Bangkit Academy 2024 Batch 2', '["Google", "GoTo", "Traveloka"]', 'Mobile Development Path', 'Specializing in Android Development', 'certificate-bangkit.jpg');


-- 5. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    year VARCHAR(10),
    association VARCHAR(255),
    icon VARCHAR(100),
    description TEXT,
    display_mode ENUM('single', 'multi') DEFAULT 'single',
    status VARCHAR(50)
);

-- ... (Skipping image and tech stack tables as they are unchanged) ...

CREATE TABLE IF NOT EXISTS project_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,
    image_url VARCHAR(255),
    position INT, -- 0 for single/main, 1 for left, 2 for right in multi mode
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS project_tech_stack (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,
    name VARCHAR(100),
    color_class VARCHAR(50),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Insert Projects (Chronological Order: 2024 -> 2026)

-- ... (Previous INSERTs) ...

-- 6. Tiket Pendakian (2026)
INSERT INTO projects (title, subtitle, year, icon, description, display_mode) VALUES
('Tiket Pendakian', 'Featured App', '2026', 'hiking', 'A comprehensive mountain hiking ticketing system built with Android Studio during my Dicoding course.', 'multi');
SET @p6_id = LAST_INSERT_ID();
INSERT INTO project_images (project_id, image_url, position) VALUES
(@p6_id, 'tiket-pendakian-1.png', 0),
(@p6_id, 'tiket-pendakian-2.png', 1),
(@p6_id, 'tiket-pendakian-3.png', 2);
INSERT INTO project_tech_stack (project_id, name, color_class) VALUES
(@p6_id, 'Flutter', 'bg-blue-500'),
(@p6_id, 'Android Studio', 'bg-green-500'),
(@p6_id, 'Dicoding', 'bg-gray-800');

-- 7. Sehatin (2026)
INSERT INTO projects (title, subtitle, year, icon, description, display_mode, status) VALUES
('Sehatin', 'Featured App', '2026', 'health_and_safety', 'Built for my 8th-semester Final Year Project, Sehatin is an Android-based gamified app that motivates teenagers to maintain a healthy lifestyle by transforming exercise and diet into exciting game challenges with rewards like points, badges, and virtual character collections.', 'multi', 'In Progress');
SET @p7_id = LAST_INSERT_ID();
INSERT INTO project_images (project_id, image_url, position) VALUES
(@p7_id, 'sehatin-1.png', 0),
(@p7_id, 'sehatin-2.png', 1),
(@p7_id, 'sehatin-3.png', 2);
INSERT INTO project_tech_stack (project_id, name, color_class) VALUES
(@p7_id, 'Kotlin', 'bg-purple-500'),
(@p7_id, 'Android Studio', 'bg-green-500'),
(@p7_id, 'UI/UX', 'bg-pink-500');

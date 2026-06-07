let activeCard = null;
let scrollTicking = false;
let mediaTriggerHandlersReady = false;

const ICONS = {
    github: `<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>`,
    linkedin: `<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path></svg>`,
    email: `<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>`
};

function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined && text !== null) element.textContent = text;
    return element;
}

function setAttributes(element, attributes = {}) {
    Object.entries(attributes).forEach(([key, value]) => {
        if (value === undefined || value === null || value === false) return;
        if (value === true) {
            element.setAttribute(key, '');
        } else {
            element.setAttribute(key, String(value));
        }
    });
    return element;
}

function makeSocialLink(kind, href, label, useTarget = true) {
    const link = createElement('a');
    setAttributes(link, {
        href,
        'aria-label': label,
        target: useTarget ? '_blank' : undefined,
        rel: useTarget ? 'noopener noreferrer' : undefined
    });
    link.innerHTML = ICONS[kind] || '';
    return link;
}

function renderProfile(data) {
    const profile = data.profile || {};

    const avatar = document.querySelector('[data-render="profile"], [data-render="avatar"]');
    if (avatar) {
        avatar.src = profile.avatar || '';
        avatar.alt = `${profile.name || 'Benjamin Cruse'} robotics avatar`;
    }

    const name = document.querySelector('[data-render="name"]');
    if (name) name.textContent = profile.name || '';

    const subtitle = document.querySelector('[data-render="subtitle"]');
    if (subtitle) subtitle.textContent = profile.subtitle || '';

    const roleTarget = document.querySelector('[data-render="role-target"]');
    if (roleTarget) roleTarget.textContent = profile.roleTarget || '';

    const sidebarNote = document.querySelector('[data-render="sidebar-note"]');
    if (sidebarNote) sidebarNote.textContent = profile.sidebarNote || '';

    const contactIntro = document.querySelector('[data-render="contact-intro"]');
    if (contactIntro) contactIntro.textContent = profile.contactIntro || '';

    renderHeroActions(profile.heroActions || []);
    renderSocialLinks(profile);
    renderContactDetails(profile);
    renderResumePreview(profile);
}

function renderHeroActions(actions) {
    const container = document.querySelector('[data-render="hero-actions"]');
    if (!container) return;
    container.innerHTML = '';
    actions.forEach(action => {
        const link = createElement('a', 'hero-action secondary', action.label);
        link.href = action.href;
        container.appendChild(link);
    });
}

function renderSocialLinks(profile) {
    const heroSocial = document.querySelector('[data-render="hero-social"]');
    const sidebarSocial = document.querySelector('[data-render="sidebar-social"]');

    [heroSocial, sidebarSocial].forEach(container => {
        if (!container) return;
        container.innerHTML = '';
        if (profile.github) container.appendChild(makeSocialLink('github', profile.github, 'GitHub'));
        if (profile.linkedin) container.appendChild(makeSocialLink('linkedin', profile.linkedin, 'LinkedIn'));
        if (profile.emails?.[0]) container.appendChild(makeSocialLink('email', '#contact', 'Email', false));
    });
}

function renderContactDetails(profile) {
    const container = document.querySelector('[data-render="contact-details"]');
    if (!container) return;
    container.innerHTML = '';

    const rows = [];
    if (profile.emails?.length) rows.push({ label: 'Email', links: profile.emails.map(email => ({ label: email, href: `mailto:${email}` })) });
    if (profile.phone) rows.push({ label: 'Phone', text: profile.phone });
    if (profile.education) rows.push({ label: 'Education', text: profile.education });
    if (profile.resume) rows.push({ label: 'Resume', links: [{ label: 'View resume PDF', href: profile.resume, external: true }] });
    if (profile.github) rows.push({ label: 'GitHub', links: [{ label: profile.github.replace(/^https?:\/\//, ''), href: profile.github, external: true }] });
    if (profile.linkedin) rows.push({ label: 'LinkedIn', links: [{ label: profile.linkedin.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''), href: profile.linkedin, external: true }] });
    if (profile.location) rows.push({ label: 'Location', text: profile.location });

    rows.forEach(row => {
        const item = createElement('div', 'contact-detail');
        const strong = createElement('strong', null, row.label);
        const span = createElement('span');
        if (row.links) {
            row.links.forEach((linkData, index) => {
                if (index > 0) span.appendChild(document.createTextNode(' / '));
                const link = createElement('a', null, linkData.label);
                link.href = linkData.href;
                if (linkData.external) {
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                }
                span.appendChild(link);
            });
        } else {
            span.textContent = row.text || '';
        }
        item.append(strong, span);
        container.appendChild(item);
    });
}

function renderResumePreview(profile) {
    const frame = document.querySelector('[data-render="resume-frame"]');
    const link = document.querySelector('[data-render="resume-link"]');
    const card = document.querySelector('[data-render="resume-preview"]');
    const resumePath = profile.resume || '';

    if (!resumePath) {
        if (card) card.hidden = true;
        return;
    }

    if (frame) frame.src = resumePath;
    if (link) link.href = resumePath;
}

function renderNavigation(data) {
    const navContainer = document.querySelector('[data-render="sidebar-nav"]');
    if (!navContainer) return;
    navContainer.innerHTML = '';
    (data.navigation || []).forEach(item => {
        const link = createElement('a', 'nav-link');
        link.href = item.href;
        const indicator = createElement('span', 'nav-indicator');
        const text = createElement('span', 'nav-text', item.label);
        link.append(indicator, text);
        navContainer.appendChild(link);
    });
}

function renderAbout(data) {
    const container = document.querySelector('[data-render="about"]');
    if (!container) return;
    container.innerHTML = '';

    const about = data.about || {};
    if (about.paragraph) container.appendChild(createElement('p', null, about.paragraph));

    if (about.items?.length) {
        const grid = createElement('div', 'overview-grid');
        about.items.forEach(item => {
            const overview = createElement('div', 'overview-item');
            overview.append(createElement('h3', null, item.title), createElement('p', null, item.text));
            grid.appendChild(overview);
        });
        container.appendChild(grid);
    }
}

function renderSkills(skills = []) {
    const container = document.querySelector('[data-render="skills"]');
    if (!container) return;
    container.innerHTML = '';
    skills.forEach(skill => container.appendChild(createElement('span', 'skill-item', skill)));
}

function mediaSource(media) {
    return media?.src || '';
}

function renderMediaElement(media, compact = false) {
    if (!media) return document.createTextNode('');
    if (media.type === 'video') {
        const video = createElement('video');
        setAttributes(video, {
            autoplay: '',
            loop: '',
            muted: '',
            playsinline: '',
            preload: 'metadata',
            poster: media.poster || media.fallback
        });
        video.muted = true;
        video.autoplay = true;
        video.loop = true;
        video.playsInline = true;
        const source = createElement('source');
        source.src = mediaSource(media);
        source.type = 'video/mp4';
        video.appendChild(source);
        if (media.fallback) {
            const fallback = createElement('img');
            fallback.src = media.fallback;
            fallback.alt = media.alt || media.caption || 'Project media';
            video.appendChild(fallback);
        }
        return video;
    }

    const img = createElement('img');
    img.src = mediaSource(media);
    img.alt = media.alt || media.caption || 'Project image';
    img.loading = compact ? 'eager' : 'lazy';
    return img;
}

function applyMediaDataset(element, media) {
    element.dataset.caption = media.caption || '';
    element.dataset.full = mediaSource(media);
    element.dataset.mediaType = media.type || 'image';
    if (media.blurb) element.dataset.blurb = media.blurb;
    element.dataset.mediaTrigger = 'true';
}

function renderFeaturedMedia(media) {
    const thumbnail = createElement('div', 'project-thumbnail');
    setAttributes(thumbnail, {
        'aria-label': `Open ${media?.type || 'media'}: ${media?.caption || 'featured media'}`,
        role: 'button',
        tabindex: '0'
    });
    applyMediaDataset(thumbnail, media || {});
    thumbnail.appendChild(renderMediaElement(media, true));
    return thumbnail;
}

function renderGalleryItem(media) {
    if (media.type === 'video') {
        const item = createElement('div', 'gallery-item media-video');
        setAttributes(item, {
            role: 'button',
            tabindex: '0',
            'aria-label': `Open video: ${media.caption || 'project video'}`
        });
        applyMediaDataset(item, media);
        item.appendChild(renderMediaElement(media));
        item.appendChild(createElement('span', null, media.caption || 'Video'));
        if (media.blurb) item.appendChild(createElement('small', 'media-blurb', media.blurb));
        return item;
    }

    const button = createElement('button', 'gallery-item image-trigger');
    setAttributes(button, {
        type: 'button',
        'aria-label': `Expand image: ${media.caption || 'project image'}`
    });
    applyMediaDataset(button, media);
    button.appendChild(renderMediaElement(media));
    button.appendChild(createElement('span', null, media.caption || 'Image'));
    if (media.blurb) button.appendChild(createElement('small', 'media-blurb', media.blurb));
    return button;
}

function renderMeta(meta = {}) {
    const dl = createElement('dl', 'project-meta');
    dl.setAttribute('aria-label', 'Project metadata');
    Object.entries(meta).forEach(([label, value]) => {
        const item = createElement('div', 'meta-item');
        item.append(createElement('dt', null, label), createElement('dd', null, value));
        dl.appendChild(item);
    });
    return dl;
}

function renderDescription(descriptions = []) {
    const wrapper = createElement('div', 'project-description');
    descriptions.forEach(section => {
        const p = createElement('p');
        if (section.label) p.appendChild(createElement('span', 'description-label', section.label));
        p.appendChild(document.createTextNode(section.label ? ` ${section.text}` : section.text));
        wrapper.appendChild(p);
    });
    return wrapper;
}

function renderTags(tags = []) {
    const wrapper = createElement('div', 'tags');
    tags.forEach(tag => wrapper.appendChild(createElement('span', 'tag', tag)));
    return wrapper;
}

function renderEntryLinks(entry) {
    const wrapper = createElement('div', 'entry-links');
    const links = Array.isArray(entry.links) ? entry.links : [];

    links.forEach(linkData => {
        const link = createElement('a', 'entry-link', linkData.label || 'Link');
        link.href = linkData.href || '#';
        if (linkData.href && !linkData.href.startsWith('#')) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }
        if (linkData.type) link.dataset.linkType = linkData.type;
        wrapper.appendChild(link);
    });


    return wrapper;
}

function renderEntry(entry) {
    const article = createElement('article', 'project-card');
    setAttributes(article, {
        id: entry.id,
        role: 'button',
        tabindex: '0',
        'aria-expanded': 'false',
        'aria-label': `Expand details for ${entry.title}`
    });
    article.dataset.topics = (entry.topics || []).join(' ');

    const content = createElement('div', 'project-content-wrapper');
    const mediaColumn = createElement('div', 'project-media-column');
    if (entry.featuredMedia) mediaColumn.appendChild(renderFeaturedMedia(entry.featuredMedia));
    if (entry.media?.length) {
        const gallery = createElement('div', 'media-gallery');
        gallery.setAttribute('aria-label', `${entry.title} media gallery`);
        entry.media.forEach(media => gallery.appendChild(renderGalleryItem(media)));
        mediaColumn.appendChild(gallery);
    }

    const info = createElement('div', 'project-info');
    const header = createElement('div', 'project-header');
    const titleGroup = createElement('div', 'project-title-group');
    titleGroup.append(createElement('span', 'entry-type', entry.type), createElement('h3', 'project-title', entry.title));
    header.append(titleGroup, createElement('span', 'expand-icon', '+'));
    info.appendChild(header);
    info.appendChild(createElement('p', 'project-summary', entry.summary));
    info.appendChild(renderEntryLinks(entry));
    info.appendChild(renderMeta(entry.meta));
    info.appendChild(renderDescription(entry.descriptions));
    info.appendChild(renderTags(entry.tags));

    content.append(mediaColumn, info);
    article.appendChild(content);
    return article;
}

function renderFilterBar(filters = []) {
    const bar = createElement('div', 'filter-bar');
    filters.forEach((filter, index) => {
        const button = createElement('button', `filter-btn${index === 0 ? ' active' : ''}`, filter.label);
        button.type = 'button';
        button.dataset.filter = filter.value || 'all';
        bar.appendChild(button);
    });
    return bar;
}

function renderSections(sections = []) {
    const container = document.querySelector('[data-render="sections"]');
    if (!container) return;
    container.innerHTML = '';

    sections.forEach(sectionData => {
        const section = createElement('section', 'content-section');
        section.id = sectionData.id;
        section.appendChild(createElement('h2', 'section-title', sectionData.title));
        section.appendChild(renderFilterBar(sectionData.filters));
        const grid = createElement('div', 'projects-grid');
        (sectionData.entries || []).forEach(entry => grid.appendChild(renderEntry(entry)));
        section.appendChild(grid);
        container.appendChild(section);
    });
}

function renderSite() {
    const data = window.PORTFOLIO_DATA;
    if (!data) {
        const content = document.querySelector('.content');
        if (content) content.prepend(createElement('p', 'data-error', 'Site data could not be loaded.'));
        return;
    }

    renderProfile(data);
    renderNavigation(data);
    renderAbout(data);
    renderSkills(data.skills || []);
    renderSections(data.sections || []);
}

function getDescription(card) {
    return card ? card.querySelector('.project-description') : null;
}

function getHeader(card) {
    return card ? card.querySelector('.project-header') : null;
}

function updateHashForOpenCard(card) {
    if (!card?.id) return;
    const nextHash = `#${encodeURIComponent(card.id)}`;
    if (window.location.hash !== nextHash) {
        history.replaceState(null, '', nextHash);
    }
}

function clearHashForClosedCard(card) {
    if (!card?.id) return;
    const currentId = decodeURIComponent((window.location.hash || '').replace(/^#/, ''));
    if (currentId !== card.id) return;
    const section = card.closest('.content-section');
    const nextHash = section?.id ? `#${encodeURIComponent(section.id)}` : window.location.pathname;
    history.replaceState(null, '', nextHash);
}

function openCard(card) {
    if (!card) return;

    document.querySelectorAll('.project-card.expanded').forEach(other => {
        if (other !== card) closeCard(other);
    });

    const description = getDescription(card);
    const header = getHeader(card);
    if (!description || !header) return;

    activeCard = card;
    closeMediaViewer();
    card.classList.add('expanded');
    card.setAttribute('aria-expanded', 'true');
    updateHashForOpenCard(card);
    header.classList.add('active');
    description.classList.add('active');

    window.requestAnimationFrame(() => {
        const smallLayout = window.matchMedia('(max-width: 1024px)').matches;
        card.scrollIntoView({ behavior: 'smooth', block: smallLayout ? 'start' : 'nearest' });
    });
}

function closeCard(card) {
    if (!card) return;

    const description = getDescription(card);
    const header = getHeader(card);

    card.classList.remove('expanded');
    card.setAttribute('aria-expanded', 'false');
    if (header) header.classList.remove('active');
    if (description) description.classList.remove('active');
    card.style.removeProperty('--expanded-shift');
    card.style.removeProperty('--expanded-width');
    clearHashForClosedCard(card);

    if (activeCard === card) {
        activeCard = null;
        closeMediaViewer();
    }
}

function toggleCard(card) {
    if (!card) return;
    if (card.classList.contains('expanded')) {
        closeCard(card);
    } else {
        openCard(card);
    }
}

function cardStillVisible(card) {
    if (!card) return false;
    const rect = card.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    return rect.bottom > vh * 0.14 && rect.top < vh * 0.86;
}

function autoCloseScrolledAwayCard() {
    scrollTicking = false;
    // On touch-sized layouts, keep expanded cards open while the user scrolls.
    // Long project descriptions were easy to auto-collapse before users reached the text.
    if (window.matchMedia('(max-width: 1024px)').matches) return;
    if (activeCard && !cardStillVisible(activeCard)) {
        closeCard(activeCard);
    }
}

function updateActiveNav() {
    const sections = Array.from(document.querySelectorAll('.content-section'));
    const navLinks = document.querySelectorAll('.nav-link');
    if (!sections.length) return;

    const content = document.querySelector('.content');
    const contentRect = content?.getBoundingClientRect();
    const probeX = contentRect
        ? Math.min(window.innerWidth - 2, Math.max(2, contentRect.left + 32))
        : Math.round(window.innerWidth * 0.66);
    const probeY = 24;

    let currentSection = sections[0].id || 'about';

    // Match the visible sticky section banner exactly by asking the browser
    // which .section-title is physically on top near the content column.
    const stackedElements = document.elementsFromPoint(probeX, probeY);
    const visibleTitle = stackedElements.find(element => element.classList?.contains('section-title'));

    if (visibleTitle?.closest('.content-section')?.id) {
        currentSection = visibleTitle.closest('.content-section').id;
    } else {
        // Fallback for browsers/scroll positions where the sticky title is not
        // directly under the probe: pick the last section whose body contains
        // the top-of-content line. This matches sticky-title replacement at
        // section boundaries better than midpoint-based tracking.
        const topLine = contentRect ? Math.max(24, contentRect.top + 24) : 96;
        const containing = sections.filter(section => {
            const rect = section.getBoundingClientRect();
            return rect.top <= topLine && rect.bottom > topLine;
        });

        if (containing.length) {
            currentSection = containing[containing.length - 1].id;
        } else {
            const nearest = sections
                .map(section => ({ section, distance: Math.abs(section.getBoundingClientRect().top - topLine) }))
                .sort((a, b) => a.distance - b.distance)[0];
            if (nearest?.section?.id) currentSection = nearest.section.id;
        }
    }

    navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${currentSection}`;
        link.classList.toggle('active', isActive);
        if (isActive) {
            link.setAttribute('aria-current', 'true');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}
function handleScroll() {
    updateActiveNav();
    if (!scrollTicking) {
        requestAnimationFrame(autoCloseScrolledAwayCard);
        scrollTicking = true;
    }
}

function updateViewerLeft() {
    document.documentElement.style.setProperty('--viewer-left', '0px');
}

function getVideoSource(video) {
    if (!video) return '';
    const nestedSource = video.querySelector('source');
    return video.currentSrc || video.getAttribute('src') || nestedSource?.getAttribute('src') || '';
}

function getMediaTrigger(target, card) {
    if (!target || !card) return null;

    const explicit = target.closest('.image-trigger, .media-video, .project-thumbnail, [data-media-trigger="true"]');
    if (explicit && card.contains(explicit)) return explicit;

    const media = target.closest('img, video');
    if (!media || !card.contains(media)) return null;
    return media.closest('.gallery-item, .project-thumbnail') || media;
}

function getMediaPayload(trigger) {
    if (!trigger) return null;

    const caption = trigger.dataset.caption || trigger.getAttribute('aria-label') || trigger.querySelector('span')?.textContent?.trim() || '';
    const blurb = trigger.dataset.blurb || trigger.querySelector('.media-blurb')?.textContent?.trim() || '';
    const explicitType = trigger.dataset.mediaType;
    const video = trigger.matches('video') ? trigger : trigger.querySelector('video');
    const img = trigger.matches('img') ? trigger : trigger.querySelector('img');

    if (explicitType === 'video' || video) {
        const src = trigger.dataset.full || getVideoSource(video);
        if (!src) return null;
        return {
            type: 'video',
            src,
            alt: caption || 'Expanded project video',
            caption: [caption.replace(/^Open video:\s*/i, ''), blurb].filter(Boolean).join(' — ')
        };
    }

    const src = trigger.dataset.full || img?.getAttribute('src') || trigger.getAttribute('src');
    if (!src) return null;
    return {
        type: 'image',
        src,
        alt: img?.getAttribute('alt') || caption || 'Expanded project image',
        caption: [caption.replace(/^Expand image:\s*/i, ''), blurb].filter(Boolean).join(' — ')
    };
}

function openMediaViewer(payloadOrSrc, alt = '', caption = '') {
    const payload = typeof payloadOrSrc === 'object'
        ? payloadOrSrc
        : { type: 'image', src: payloadOrSrc, alt, caption };

    const viewer = document.getElementById('image-viewer');
    const img = document.getElementById('image-viewer-img');
    const video = document.getElementById('image-viewer-video');
    const cap = document.getElementById('image-viewer-caption');
    if (!viewer || !payload?.src) return;

    updateViewerLeft();

    if (img) {
        img.removeAttribute('src');
        img.alt = '';
        img.hidden = true;
    }
    if (video) {
        video.pause();
        video.removeAttribute('src');
        video.hidden = true;
        video.load();
    }

    if (payload.type === 'video' && video) {
        video.src = payload.src;
        video.hidden = false;
        video.load();
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(() => {});
        }
    } else if (img) {
        img.src = payload.src;
        img.alt = payload.alt || payload.caption || 'Expanded project image';
        img.hidden = false;
    }

    if (cap) cap.textContent = payload.caption || '';
    viewer.classList.add('active');
    viewer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('viewer-open');
}

function openImageViewer(src, alt, caption) {
    openMediaViewer({ type: 'image', src, alt, caption });
}

function closeMediaViewer() {
    const viewer = document.getElementById('image-viewer');
    const img = document.getElementById('image-viewer-img');
    const video = document.getElementById('image-viewer-video');
    if (!viewer) return;

    viewer.classList.remove('active');
    viewer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('viewer-open');
    if (img) {
        img.removeAttribute('src');
        img.hidden = true;
    }
    if (video) {
        video.pause();
        video.removeAttribute('src');
        video.hidden = true;
        video.load();
    }
}

function closeImageViewer() {
    closeMediaViewer();
}

function setupDirectMediaTriggers() {
    if (mediaTriggerHandlersReady) return;
    mediaTriggerHandlersReady = true;
    const selector = '.image-trigger, .media-video, .project-thumbnail, [data-media-trigger="true"]';

    document.addEventListener('click', event => {
        const trigger = event.target.closest(selector);
        if (!trigger) return;
        const card = trigger.closest('.project-card');
        if (!card) return;

        event.preventDefault();
        event.stopPropagation();
        if (typeof event.stopImmediatePropagation === 'function') {
            event.stopImmediatePropagation();
        }

        if (!card.classList.contains('expanded')) {
            openCard(card);
            return;
        }

        const payload = getMediaPayload(trigger);
        if (payload) openMediaViewer(payload);
    }, true);

    document.addEventListener('keydown', event => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        const trigger = event.target.closest(selector);
        if (!trigger) return;
        const card = trigger.closest('.project-card');
        if (!card) return;

        event.preventDefault();
        event.stopPropagation();
        if (typeof event.stopImmediatePropagation === 'function') {
            event.stopImmediatePropagation();
        }

        if (!card.classList.contains('expanded')) {
            openCard(card);
            return;
        }

        const payload = getMediaPayload(trigger);
        if (payload) openMediaViewer(payload);
    }, true);
}

function setupCards() {
    document.querySelectorAll('.project-card').forEach(card => {
        const title = card.querySelector('.project-title')?.textContent?.trim();
        if (title) card.setAttribute('aria-label', `Toggle details for ${title}`);

        card.addEventListener('click', event => {
            const mediaTrigger = getMediaTrigger(event.target, card);
            if (card.classList.contains('expanded') && mediaTrigger) {
                const payload = getMediaPayload(mediaTrigger);
                if (payload) {
                    event.preventDefault();
                    event.stopPropagation();
                    openMediaViewer(payload);
                    return;
                }
            }

            if (event.target.closest('a, button, input, textarea, select')) {
                return;
            }

            toggleCard(card);
        });

        card.addEventListener('keydown', event => {
            if (event.key !== 'Enter' && event.key !== ' ') return;

            const mediaTrigger = getMediaTrigger(event.target, card);
            if (card.classList.contains('expanded') && mediaTrigger) {
                const payload = getMediaPayload(mediaTrigger);
                if (payload) {
                    event.preventDefault();
                    event.stopPropagation();
                    openMediaViewer(payload);
                    return;
                }
            }

            event.preventDefault();
            toggleCard(card);
        });
    });
}

function setupViewer() {
    const viewer = document.getElementById('image-viewer');
    if (!viewer) return;

    viewer.addEventListener('click', event => {
        if (event.target.matches('[data-close-viewer], .image-viewer-close')) {
            closeMediaViewer();
        }
    });
}

function setupFilters() {
    document.querySelectorAll('.filter-bar').forEach(bar => {
        const section = bar.closest('.content-section');
        const sectionCards = section ? Array.from(section.querySelectorAll('.project-card')) : [];

        bar.querySelectorAll('.filter-btn').forEach(button => {
            const filter = button.dataset.filter || 'all';
            if (filter === 'all') return;
            const hasMatch = sectionCards.some(card => (card.dataset.topics || '').split(/\s+/).includes(filter));
            if (!hasMatch) button.remove();
        });

        bar.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', event => {
                event.preventDefault();
                event.stopPropagation();
                const filter = button.dataset.filter || 'all';

                bar.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                sectionCards.forEach(card => {
                    const topics = (card.dataset.topics || '').split(/\s+/);
                    const show = filter === 'all' || topics.includes(filter);
                    card.classList.toggle('is-filter-hidden', !show);
                    if (!show && card.classList.contains('expanded')) closeCard(card);
                });
            });
        });
    });
}


function setupSectionNavScrolling() {
    document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
        link.addEventListener('click', event => {
            const hash = link.getAttribute('href') || '';
            const id = decodeURIComponent(hash.replace(/^#/, ''));
            const target = id ? document.getElementById(id) : null;
            if (!target) return;

            event.preventDefault();

            const targetTop = target.getBoundingClientRect().top + (window.scrollY || window.pageYOffset || 0);
            history.pushState(null, '', hash);
            window.scrollTo({
                top: Math.max(0, Math.round(targetTop)),
                behavior: 'smooth'
            });
            updateActiveNav();
        });
    });
}

function setupSeamlessScroll() {
    const scrollContainer = document.querySelector('.skills-scroll');
    if (!scrollContainer) return;

    const originalItems = Array.from(scrollContainer.querySelectorAll('.skill-item'));
    shuffleArray(originalItems);
    scrollContainer.innerHTML = '';
    originalItems.forEach(item => scrollContainer.appendChild(item));

    const scrollContent = scrollContainer.innerHTML;
    scrollContainer.innerHTML = scrollContent + scrollContent + scrollContent;

    const items = scrollContainer.querySelectorAll('.skill-item');
    let singleSetWidth = 0;
    const itemCount = items.length / 3;

    for (let i = 0; i < itemCount; i++) {
        singleSetWidth += items[i].offsetWidth;
        if (i < itemCount - 1) singleSetWidth += 30;
    }

    scrollContainer.style.setProperty('--scroll-width', `${singleSetWidth}px`);
}

function shuffleArray(items) {
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    }
}

function openEntryFromHash() {
    const id = decodeURIComponent((window.location.hash || '').replace(/^#/, ''));
    if (!id) return;
    const card = document.getElementById(id);
    if (card && card.classList.contains('project-card')) {
        openCard(card);
    }
}

window.addEventListener('hashchange', openEntryFromHash);

window.addEventListener('scroll', handleScroll, { passive: true });
window.addEventListener('resize', updateViewerLeft);

document.addEventListener('DOMContentLoaded', () => {
    renderSite();
    setupSectionNavScrolling();
    updateActiveNav();
    updateViewerLeft();
    setupDirectMediaTriggers();
    setupCards();
    setupViewer();
    setupFilters();
    setupSeamlessScroll();
    openEntryFromHash();

    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const mainContainer = document.querySelector('.main-container');
            if (mainContainer) mainContainer.scrollIntoView({ behavior: 'smooth' });
        });
    }
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        if (document.getElementById('image-viewer')?.classList.contains('active')) {
            closeMediaViewer();
            return;
        }
        if (activeCard) closeCard(activeCard);
    }
});

/* Desktop sidebar follow behavior.
   This intentionally uses a fixed inner panel instead of CSS sticky so the
   sidebar keeps the original desktop behavior even when mobile overflow fixes
   are present elsewhere in the stylesheet. */
function setupDesktopSidebarFollow() {
    const main = document.querySelector('.main-container');
    const sidebar = document.querySelector('.sidebar');
    const panel = document.querySelector('.sidebar-content');
    if (!main || !sidebar || !panel) return;

    const desktopQuery = window.matchMedia('(min-width: 1025px)');
    let ticking = false;

    function resetPanel() {
        panel.classList.remove('sidebar-follow-fixed', 'sidebar-follow-bottom');
        panel.style.removeProperty('--sidebar-follow-left');
        panel.style.removeProperty('--sidebar-follow-width');
    }

    function updateSidebarFollow() {
        ticking = false;

        if (!desktopQuery.matches) {
            resetPanel();
            return;
        }

        const scrollY = window.scrollY || window.pageYOffset || 0;
        const mainRect = main.getBoundingClientRect();
        const sidebarRect = sidebar.getBoundingClientRect();
        const mainTop = mainRect.top + scrollY;
        const mainBottom = mainTop + main.offsetHeight;
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const pinEnd = mainBottom - viewportHeight;

        panel.style.setProperty('--sidebar-follow-left', `${sidebarRect.left}px`);
        panel.style.setProperty('--sidebar-follow-width', `${sidebarRect.width}px`);

        panel.classList.remove('sidebar-follow-fixed', 'sidebar-follow-bottom');

        if (scrollY < mainTop) {
            return;
        }

        if (scrollY >= pinEnd) {
            panel.classList.add('sidebar-follow-bottom');
            return;
        }

        panel.classList.add('sidebar-follow-fixed');
    }

    function requestUpdate() {
        if (!ticking) {
            window.requestAnimationFrame(updateSidebarFollow);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    desktopQuery.addEventListener?.('change', requestUpdate);
    window.addEventListener('load', requestUpdate);
    requestUpdate();
    setTimeout(requestUpdate, 250);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupDesktopSidebarFollow);
} else {
    setupDesktopSidebarFollow();
}

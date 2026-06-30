(function () {
  const COUNTER_SRC =
    'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';

  function onReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
    } else {
      callback();
    }
  }

  function isLocalPreview() {
    return ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname);
  }

  function loadCounter() {
    if (document.getElementById('busuanzi-counter-script')) {
      return;
    }

    const script = document.createElement('script');
    script.id = 'busuanzi-counter-script';
    script.async = true;
    script.src = COUNTER_SRC;
    document.body.appendChild(script);
  }

  function createIcon() {
    const icon = document.createElement('i');
    icon.className = 'far fa-eye fa-fw me-1';
    icon.setAttribute('aria-hidden', 'true');
    return icon;
  }

  function addHomePageviews() {
    const postList = document.getElementById('post-list');

    if (!postList || document.getElementById('chb-home-pageviews')) {
      return false;
    }

    const wrapper = document.createElement('div');
    wrapper.id = 'chb-home-pageviews';
    wrapper.className = 'post-meta text-muted mb-3';

    wrapper.appendChild(createIcon());
    wrapper.append('Home ');

    const value = document.createElement('em');
    value.id = 'busuanzi_value_page_pv';
    value.textContent = '-';

    wrapper.appendChild(value);
    wrapper.append(' views');

    postList.parentNode.insertBefore(wrapper, postList);
    return true;
  }

  function addPostPageviews() {
    const metaRight = document.querySelector(
      'article header .post-meta .d-flex.justify-content-between > div:last-child'
    );

    if (!metaRight || document.getElementById('chb-post-pageviews')) {
      return false;
    }

    const wrapper = document.createElement('span');
    wrapper.id = 'chb-post-pageviews';
    wrapper.className = 'ms-3';

    wrapper.appendChild(createIcon());

    const value = document.createElement('em');
    value.id = 'busuanzi_value_page_pv';
    value.textContent = '-';

    wrapper.appendChild(value);
    wrapper.append(' views');

    metaRight.appendChild(wrapper);
    return true;
  }

  onReady(function () {
    if (isLocalPreview()) {
      return;
    }

    const layout = window.chbPageviews && window.chbPageviews.layout;
    const inserted =
      layout === 'home'
        ? addHomePageviews()
        : layout === 'post'
          ? addPostPageviews()
          : false;

    if (inserted) {
      loadCounter();
    }
  });
})();

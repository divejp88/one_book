// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="index.html"><strong aria-hidden="true">1.</strong> README</a></li><li class="chapter-item expanded "><a href="chapter-define-opb.html"><strong aria-hidden="true">2.</strong> 定义一人企业</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="opb-methodology-new-version-and-author.html"><strong aria-hidden="true">2.1.</strong> 新版方法论概述</a></li><li class="chapter-item expanded "><a href="define-opb.html"><strong aria-hidden="true">2.2.</strong> 一人企业的定义</a></li></ol></li><li class="chapter-item expanded "><a href="chapter-plan-opb.html"><strong aria-hidden="true">3.</strong> 规划一人企业</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="why-thinking-big-is-possible.html"><strong aria-hidden="true">3.1.</strong> 底层逻辑:为什么以小博大是可能的</a></li><li class="chapter-item expanded "><a href="why-scalability-is-possible.html"><strong aria-hidden="true">3.2.</strong> 底层逻辑:为什么规模化是可能的</a></li><li class="chapter-item expanded "><a href="assets-and-passive-income.html"><strong aria-hidden="true">3.3.</strong> 底层逻辑:资产和被动收入</a></li><li class="chapter-item expanded "><a href="snowballing-and-chain-propagation.html"><strong aria-hidden="true">3.4.</strong> 底层逻辑:滚雪球和链式传播</a></li><li class="chapter-item expanded "><a href="race-track-selection-for-opb.html"><strong aria-hidden="true">3.5.</strong> 赛道选择:一人企业如何选择赛道</a></li><li class="chapter-item expanded "><a href="non-competition-strategy.html"><strong aria-hidden="true">3.6.</strong> 竞争策略:不竞争策略</a></li><li class="chapter-item expanded "><a href="structured-advantage.html"><strong aria-hidden="true">3.7.</strong> 竞争策略:结构化优势</a></li><li class="chapter-item expanded "><a href="opb-canvas-and-opb-report.html"><strong aria-hidden="true">3.8.</strong> 思考工具:《一人企业画布》和《一人企业月报》</a></li></ol></li><li class="chapter-item expanded "><a href="chapter-build-opb.html"><strong aria-hidden="true">4.</strong> 构建一人业务</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="one-person-enterprise-does-not-equal-one-person-business.html"><strong aria-hidden="true">4.1.</strong> 一人企业≠一人业务</a></li><li class="chapter-item expanded "><a href="discovery-of-by-product-advantages.html"><strong aria-hidden="true">4.2.</strong> 优势发现:副产品优势</a></li><li class="chapter-item expanded "><a href="start-from-side-project.html"><strong aria-hidden="true">4.3.</strong> 风险评控:从副业开始</a></li><li class="chapter-item expanded "><a href="managing-and-utilizing-uncertaint.html"><strong aria-hidden="true">4.4.</strong> 风险评控:管理和利用不确定性</a></li><li class="chapter-item expanded "><a href="building-software-products-or-services-from-scratch.html"><strong aria-hidden="true">4.5.</strong> 产品构建:从零构建软件产品或服务</a></li></ol></li><li class="chapter-item expanded "><a href="chapter-build-infrastructure.html"><strong aria-hidden="true">5.</strong> 基础设施及搭建</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="what-is-the-ideal-one-person-business-infrastructure.html"><strong aria-hidden="true">5.1.</strong> 理想的一人企业基础设施</a></li><li class="chapter-item expanded "><a href="infrastructure-user-pool-reach-capability.html"><strong aria-hidden="true">5.2.</strong> 用户池和触达能力</a></li><li class="chapter-item expanded "><a href="content-pool-and-automation-capability.html"><strong aria-hidden="true">5.3.</strong> 内容池和自动化能力</a></li><li class="chapter-item expanded "><a href="product-pool-and-payment-capability.html"><strong aria-hidden="true">5.4.</strong> 产品池和支付能力</a></li><li class="chapter-item expanded "><a href="crowdsourcing-capability.html"><strong aria-hidden="true">5.5.</strong> 众包能力</a></li><li class="chapter-item expanded "><a href="setup-a-one-person-business-infrastructure.html"><strong aria-hidden="true">5.6.</strong> 搭建一人企业基础设施</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);

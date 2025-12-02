// test div resize


        function initProjectFlexAnimations() {
        const aboutSec = document.getElementById("aboutSec");
        const mainProject1 = document.getElementById("mainProject1");
        const mainProject2 = document.getElementById("mainProject2");
        const mainProject3 = document.getElementById("mainProject3");

        const accountImgNat = document.getElementById("accountImgNat");
        const accountImgAnon = document.getElementById("accountImgAnon");
        const sendingImg1 = document.getElementById("sendingImg1");
        const sendingImg2 = document.getElementById("sendingImg2");
        const carouselImg = document.querySelectorAll(".carousel-image");

        carouselImg.forEach(img => {
            img.addEventListener("mouseover", () => {
                img.style.transform = "translateY(-64px) scale(1.1)";
            });
            img.addEventListener("mouseleave", () => {
                img.style.transform = "translateY(0px) scale(1.0)";
            });
        });

        sendingImg1.addEventListener("mouseleave", () => {
            sendingImg1.style.transform = "translate(-60%, 0%) translate(-15px, -15px) rotate(-10deg) scale(1.0)";
        });
        sendingImg1.addEventListener("mouseover", () => {
            sendingImg1.style.transform = "translate(-60%, 0%) translate(-15px, -15px) rotate(-15deg) scale(1.1)";
        });
        
        sendingImg2.addEventListener("mouseover", () => {
            sendingImg2.style.transform = "translate(-60%, 0%) translate(100px, -15px) rotate(15deg) scale(1.1)";
        });
        sendingImg2.addEventListener("mouseleave", () => {
            sendingImg2.style.transform = "translate(-60%, 0%) translate(100px, -15px) rotate(10deg) scale(1.0)";
        });
        
        
        
        accountImgNat.addEventListener("mouseleave", () => {
            accountImgNat.style.transform = "translate(-60%, 0%) translate(-15px, -15px) rotate(-10deg) scale(1.0)";
        });
        accountImgNat.addEventListener("mouseover", () => {
            accountImgNat.style.transform = "translate(-60%, 0%) translate(-15px, -15px) rotate(-15deg) scale(1.1)";
        });

        accountImgAnon.addEventListener("mouseover", () => {
            accountImgAnon.style.transform = "translate(-60%, 0%) translate(100px, -15px) rotate(15deg) scale(1.1)";
        });
        accountImgAnon.addEventListener("mouseleave", () => {
            accountImgAnon.style.transform = "translate(-60%, 0%) translate(100px, -15px) rotate(10deg) scale(1.0)";
        });
        
        
        console.log("init project flex animations 🟥🟥🟥");

        let aboutSecY = window.scrollY;
        let aboutSecHeight = aboutSec.getBoundingClientRect().height;
        let aboutProjTriggerHeight = aboutSecY + aboutSecHeight;

        let projectID = event.target.id;
        
        // Intersection Observer to detect when aboutSec comes into view
        const aboutSecObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                aboutSecInView = entry.isIntersecting;
                console.log("aboutSecInView: " + aboutSecInView);

                if (!aboutSecInView) {
                    // Reset to initial state when aboutSec is not in view
                    console.log("testing again 🟢🟢🟢🟢");

                    // if mouseover, hover etc, any of the three items, overwrite previous set of rules and make selected flex 1.25, and others 0.25
                } else if (aboutSecY > 1760 && aboutSecY < 2060) {
                    console.log("aboutSecY: " + aboutSecY);
                    console.log("aboutSecHeight: " + aboutSecHeight);
                    console.log("🟥 " + window.scrollY);
                    //mainProject1.className = "";
                    mainProject1.className = "flexHeightQuarter";
                    mainProject2.className = "flexHeight1";
                    mainProject3.className = "flexHeightQuarter";
                } else if(aboutSecY > 2061) {
                    //mainProject1.className("");
                    mainProject1.className = "flexHeightQuarter";
                    mainProject2.className = "flexHeightQuarter";
                    mainProject3.className = "flexHeight1";
                } else {
                    //mainProject1.className("");
                    mainProject1.className = "flexHeight1";
                    mainProject2.className = "flexHeightQuarter";
                    mainProject3.className = "flexHeightQuarter";
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px' // Trigger when aboutSec is 10% from bottom of viewport
        });
        
        // Start observing aboutSec
        aboutSecObserver.observe(aboutSec);
        
        /* // Listen for scroll events
        let ticking = false;
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick);
        
        // Initialize with original values
        updateFlexValues('initial'); */
        handleScroll();
    }

    function updateSideNavHeight() {
        if (window.innerWidth <= 600) {
            return;
        }

        console.log("viewport width: " + window.innerWidth);
        let viewportHeight = window.innerHeight;
        let viewportWidth = window.innerWidth;
        
        // set heights
        document.getElementById("testDiv1").style.height = (viewportHeight - 32) + "px";
        //document.getElementById("testDiv5").style.height = (viewportHeight - 32) + "px";
        /* document.getElementById("inspoSec").style.height = (viewportHeight - 32) + "px"; */
        document.getElementById("sideNav").style.height = (viewportHeight - 120) + "px";
        
        // set widths        
        document.getElementById("mainContentDiv").style.width = (viewportWidth - 280) + "px";
        console.log("viewport width: " + viewportWidth);
        let mainContentWidth = document.getElementById("mainContentDiv").style.width;
        let mainNavWidthPX = mainContentWidth.replace("px", "");
        console.log("wowow" + mainNavWidthPX);

        let sideNavWidth = viewportWidth - mainContentWidth.replace("px", "") - 64;
        console.log("side nav width: " + sideNavWidth);
        // set side nav width
        document.getElementById("sideNav").style.width = (sideNavWidth) + "px";
        console.log("main content div width: " + mainContentWidth.replace("px", ""));
    }

    // Run on load and resize
    window.addEventListener("load", () => {
        updateSideNavHeight();
        console.log("loaded🟥🟥🟥");
    }); 
    window.addEventListener("resize", updateSideNavHeight);

    // cursor position

    function coordinate(event) {
        let x = event.clientX;
        let y = event.clientY;
        document.getElementById('cursPosX').innerHTML = x;
        document.getElementById('cursPosY').innerHTML = y;
    }


    // hover to change project image view

    let projImages = document.querySelectorAll('.previewImg');
    let proj1FullView = document.getElementById('p1ImageFullView');
    
    let hideTimeout;
    function toggleDisplay(event) {
        const previewDiv = event.target.classList.contains('previewImg') ? event.target : event.target.parentElement;
        proj1FullView.style.display = "flex";
        if (event.type === "mouseover") {
            clearTimeout(hideTimeout);
            // Reset all preview images to original size first
            projImages.forEach(img => {
                img.style.transform = "translateY(0)";
                img.style.height = "48px";
            });
            // Get the image source from the hovered preview
            const previewImg = previewDiv.querySelector('img');
            const imgSrc = previewImg.src;
            // Set the background image of the full view
            proj1FullView.style.backgroundImage = `url(${imgSrc})`;
            proj1FullView.style.display = "flex";
            previewDiv.style.transform = "translateY(-8px)";
            previewDiv.style.height = "56px";
        } else {
            hideTimeout = setTimeout(() => {
                proj1FullView.style.display = "none";
                previewDiv.style.transform = "translateY(0)";
                previewDiv.style.height = "48px";
            }, 100);
        }
    }
    
    projImages.forEach(img => {
        img.addEventListener("mouseover", toggleDisplay);
        img.addEventListener("mouseout", toggleDisplay);
    });

  
    // smooth anchor scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
                e.preventDefault();
        
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
    }); 
  
    // get viewport height function

    let viewportHeight = window.innerHeight;

     // need to reset arrays on page load down the page 🚨🚨🚨
  
    let secScrollY = JSON.parse(localStorage.getItem("secScrollY")) || [];
    let activeSecs = JSON.parse(localStorage.getItem("activeSecs")) || [];
    
    const sections = document.querySelectorAll(".folioSection");
    const navLinks = document.querySelectorAll(".sideNavList a");
  
    // about section card 1 reveal
    document.addEventListener("DOMContentLoaded", function () {
        const aboutSec = document.getElementById("aboutSec");
        const wipeAwaySec = document.getElementById("projectSec");
        const coverEcercises = document.getElementById("coverExercises");
        const revealItems = document.querySelectorAll("#natwalk, #sibling1, #sibling2");
        const projectItems = document.querySelectorAll("#project1, #project2, #project3");
        const sideNavNat = document.getElementById("sideNavNat");

        let hasScrolledPast = false;
        let hasScrolledPastProjects = false;

        // Vertical line animation
        const coverDiv = document.getElementById("coverDivProjects");
        const verticalLine = document.getElementById("verticalLine");
        const coverTitle = document.getElementById("coverTitleProjects");
        let lastScrollTop = 0;
        let titleInterval;
        const titles = [
            "Exercises",
            "Mobile apps",
            "Websites",
            "Web apps",
            "Blog posts"
        ];
        let currentTitleIndex = 0;

        function cycleTitles() {
            const currentTitle = titles[currentTitleIndex];
            currentTitleIndex = (currentTitleIndex + 1) % titles.length;
            const nextTitle = titles[currentTitleIndex];
            
            coverTitle.style.textAlign = "center";
            coverTitle.textContent = currentTitle;
            
            setTimeout(() => {
                titleJumbleText(coverTitle, currentTitle, nextTitle);
            }, 3000);
        }
    
        const lineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const rect = coverDiv.getBoundingClientRect();
                const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollingDown = currentScrollTop > lastScrollTop;
                const viewportHeight = window.innerHeight;
                
                // Different trigger points based on scroll direction
                if (scrollingDown) {
                    if (rect.top <= viewportHeight/2) {
                        verticalLine.style.width = "100%";
                    }
                    if (rect.top <= 0) {
                        // Start cycling titles
                        if (!titleInterval) {
                            /* titleInterval = setInterval(cycleTitles, 3000); */
                            console.log("null");
                        }
                    }
                } else {
                    if (rect.top <= 0) {
                        verticalLine.style.width = "100%";
                        // Start cycling titles
                        if (!titleInterval) {
                            /* titleInterval = setInterval(cycleTitles, 3000); */
                            console.log("null");
                        }
                    } else {
                        verticalLine.style.height = "0";
                        // Stop cycling titles
                        if (titleInterval) {
                            /* clearInterval(titleInterval); */
                            titleInterval = null;
                            const currentText = coverTitle.textContent;
                            coverTitle.style.textAlign = "center";
                            /* titleJumbleText(coverTitle, currentText, titles[0]); */
                        }
                    }
                }
                
                lastScrollTop = currentScrollTop;
            });
            }, { 
                threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
                rootMargin: "-50% 0px 0px 0px"
        });

        if (coverDiv && verticalLine) {
            lineObserver.observe(coverDiv);
            // Also watch for scroll events to ensure we don't miss the trigger
            document.addEventListener('scroll', () => {
                initProjectFlexAnimations();
                const rect = coverDiv.getBoundingClientRect();
                const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollingDown = currentScrollTop > lastScrollTop;
                const viewportHeight = window.innerHeight;
                const sideNavItems = document.querySelectorAll(".sideNavItem");
                
                // Different trigger points based on scroll direction
                if (scrollingDown) {
                    if (rect.top <= viewportHeight/2) {
                        verticalLine.style.height = "100%";
                        /* sideNavItems.forEach(item => {
                            item.style.color = "#1d2e21";
                        }); */
                    }
                    if (rect.top <= 0) {
                        // Start cycling titles
                        if (!titleInterval) {
                            titleInterval = setInterval(cycleTitles, 3000);
                        }
                    }
                    // background color change
                    /* if (rect.top <= 0) {
                        const body = document.body;
                        body.style.backgroundColor = "#FFEF9D";
                    } */
                } else {
                    if (rect.top <= 0) {
                        verticalLine.style.height = "100%";
                        // Start cycling titles
                        if (!titleInterval) {
                            titleInterval = setInterval(cycleTitles, 3000);
                        }
                    } else {
                        verticalLine.style.height = "0";
                        // Stop cycling titles
                        if (titleInterval) {
                            clearInterval(titleInterval);
                            titleInterval = null;
                            const currentText = coverTitle.textContent;
                            coverTitle.style.textAlign = "center";
                            titleJumbleText(coverTitle, currentText, titles[0]);
                        }
                    }
                    /* if (rect.top < 0) {
                        body.style.backgroundColor = "#304c37";
                    } */
                }
                
                lastScrollTop = currentScrollTop;
            });
        }

        // Observer to reveal items when #aboutSec is in view
        const revealObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                console.log("Revealing elements...");
                revealItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = "1";
                        item.style.transform = "translateY(0px)";
                    }, index * 200);
                });
            }
        }, { threshold: 0.4 });

        revealObserver.observe(natwalk);

        // Observer to hide items when #wipeAwaySec1 enters, and re-reveal when it's about to leave
        const wipeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log("Hiding elements...");
                    hasScrolledPast = true;
                    revealItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = "0";
                            item.style.transform = "translateY(-50px)";
                        }, index * 200);
                        sideNavNat.style.opacity = "1";
                        sideNavNat.style.transform = "translateY(0px)";
                    });
                } else if (entry.boundingClientRect.top > 0 && hasScrolledPast) {
                    console.log("Re-revealing elements...");
                    revealItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = "1";
                            item.style.transform = "translateY(0px)";
                        }, index * 200);
                        sideNavNat.style.opacity = "0";
                        sideNavNat.style.transform = "translateY(30px)";
                    });
                }
            });
        }, { threshold: 0.1 });

        wipeObserver.observe(wipeAwaySec);

        // New observer for project section reveal
        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log("Revealing project elements...");
                    hasScrolledPastProjects = true;
                    projectItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = "1";
                            item.style.transform = "translateY(0px)";
                        }, index * 200);
                    });
                } else if (entry.boundingClientRect.top > 0 && hasScrolledPastProjects) {
                    console.log("Hiding project elements...");
                    projectItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = "0";
                            item.style.transform = "translateY(50px)";
                        }, index * 200);
                    });
                }
            });
        }, { threshold: 0.5 });

        projectObserver.observe(coverEcercises); // used to be wipeAwaySec

        // Set initial state for project items
        projectItems.forEach(item => {
            item.style.opacity = "0";
            item.style.transform = "translateY(-50px)";
            item.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        });

        // are main projects being hovered?
        if (mainProject1) {
            mainProject1.addEventListener('mouseenter', () => {
                console.log("Hovering over mainProject1");
                
            });
            mainProject1.addEventListener('mouseleave', () => {
                console.log("Stopped hovering over mainProject1");
            });
        }
        
        if (mainProject2) {
            mainProject2.addEventListener('mouseenter', () => {
                console.log("Hovering over mainProject2");
            });
            mainProject2.addEventListener('mouseleave', () => {
                console.log("Stopped hovering over mainProject2");
                // on mouse leave, reset the flex values to the scroll based rules
            });
        }
        
        if (mainProject3) {
            mainProject3.addEventListener('mouseenter', () => {
                console.log("Hovering over mainProject3");  
            });
            mainProject3.addEventListener('mouseleave', () => {
                console.log("Stopped hovering over mainProject3");
            });
        }
    });

    // Function for title cycling animation
    function titleJumbleText(element, originalText, nextText) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let startTime = null;
        let animationFrame;
        
        // Animation timing constants
        const startJumbleDuration = 400;
        const revealDuration = 800;
        const charRevealDelay = revealDuration / nextText.length;
        
        function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const totalDuration = startJumbleDuration + revealDuration;
            
            if (elapsed < totalDuration) {
                let resultText = '';
                const maxLength = Math.max(originalText.length, nextText.length);
                
                if (elapsed < startJumbleDuration) {
                    // Phase 1: Start jumbling from right
                    const jumbleProgress = elapsed / startJumbleDuration;
                    const charsToJumble = Math.floor(originalText.length * jumbleProgress);
                    
                    for (let i = 0; i < originalText.length; i++) {
                        if (i >= originalText.length - charsToJumble) {
                            resultText += characters[Math.floor(Math.random() * characters.length)];
                        } else {
                            resultText += originalText[i];
                        }
                    }
                } else {
                    // Phase 2: Reveal new text from right
                    const revealProgress = (elapsed - startJumbleDuration) / revealDuration;
                    const charsToReveal = Math.floor(nextText.length * revealProgress);
                    
                    // Add jumbled padding to maintain right alignment
                    const paddingNeeded = maxLength - nextText.length;
                    for (let i = 0; i < paddingNeeded; i++) {
                        resultText += characters[Math.floor(Math.random() * characters.length)];
                    }
                    
                    // Build the text from right to left
                    for (let i = 0; i < nextText.length; i++) {
                        if (i >= nextText.length - charsToReveal) {
                            resultText += nextText[i];
                        } else {
                            resultText += characters[Math.floor(Math.random() * characters.length)];
                        }
                    }
                }
                
                element.textContent = resultText;
                animationFrame = requestAnimationFrame(animate);
            } else {
                element.textContent = nextText;
            }
        }
        
        animationFrame = requestAnimationFrame(animate);
    }

    // Original jumble text function for nav items
    function jumbleText(element, originalText, duration = 1000) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let startTime = null;
        let animationFrame;
        const startScrambleDuration = 300; // Time for letters to start scrambling in sequence
        const allScrambleDuration = 400; // All letters scramble together
        const settleDuration = 600; // Time for characters to settle in sequence
        const startCharDelay = startScrambleDuration / originalText.length;
        const settleCharDelay = settleDuration / originalText.length;
        
        function easeInOut(t) {
            const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            return Math.sqrt(eased * eased * 0.5);
        }
        
        function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const totalDuration = startScrambleDuration + allScrambleDuration + settleDuration;
            const progress = Math.min(elapsed / totalDuration, 1);
            
            if (progress < 1) {
                let jumbledText = '';
                const isInStartPhase = elapsed < startScrambleDuration;
                const isInAllScramblePhase = elapsed >= startScrambleDuration && elapsed < (startScrambleDuration + allScrambleDuration);
                const isInSettlePhase = elapsed >= (startScrambleDuration + allScrambleDuration);
                const settlePhaseElapsed = Math.max(0, elapsed - (startScrambleDuration + allScrambleDuration));

                for (let i = 0; i < originalText.length; i++) {
                    if (originalText[i] === ' ' || originalText[i] === '.') {
                        jumbledText += originalText[i];
                        continue;
                    }

                    if (isInStartPhase) {
                        const charStartProgress = Math.max(0, Math.min(1, (elapsed - (i * startCharDelay)) / startCharDelay));
                        if (charStartProgress > 0) {
                            jumbledText += characters[Math.floor(Math.random() * characters.length)];
                        } else {
                            jumbledText += originalText[i];
                        }
                    } else if (isInAllScramblePhase) {
                        jumbledText += characters[Math.floor(Math.random() * characters.length)];
                    } else {
                        const charSettleProgress = Math.max(0, Math.min(1, (settlePhaseElapsed - (i * settleCharDelay)) / settleCharDelay));
                        if (charSettleProgress >= 1) {
                            jumbledText += originalText[i];
                        } else {
                            jumbledText += characters[Math.floor(Math.random() * characters.length)];
                        }
                    }
                }
                
                element.textContent = jumbledText;
                animationFrame = requestAnimationFrame(animate);
            } else {
                element.textContent = originalText;
            }
        }
        
        animationFrame = requestAnimationFrame(animate);
    }

// Create an Intersection Observer
const observer = new IntersectionObserver(entries => {
    let intersectFlag = false;

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            intersectFlag = true;
        }
    });

    entries.forEach(entry => {
        let activeSectionID = entry.target.id;
        
        if (entry.isIntersecting) {
            if (!activeSecs.includes(activeSectionID)) {
                activeSecs.push(activeSectionID);
                secScrollY.push(window.scrollY);
                localStorage.setItem("secScrollY", JSON.stringify(secScrollY));
                localStorage.setItem("activeSecs", JSON.stringify(activeSecs));
            }

            // Remove active class from all
            activeSecs.forEach(section => {
                const navElement = document.getElementById(section + "Nav");
                if (navElement) {
                    navElement.classList.remove("bgActive");
                }
            });

            // Add active class to the current one and jumble text
            const currentNavElement = document.getElementById(activeSectionID + "Nav");
            if (currentNavElement) {
                currentNavElement.classList.add("bgActive");
                const originalText = currentNavElement.textContent;
                jumbleText(currentNavElement, originalText);
            }
        } else {
            let index = activeSecs.indexOf(activeSectionID);
            if (index !== -1) {
                activeSecs.splice(index, 1);
                secScrollY.splice(index, 1);
                localStorage.setItem("secScrollY", JSON.stringify(secScrollY));
                localStorage.setItem("activeSecs", JSON.stringify(activeSecs));
            }

            const navElement = document.getElementById(activeSectionID + "Nav");
            if (navElement) {
                navElement.classList.remove("bgActive");
            }

            if (activeSecs.length > 0) {
                let lastID = activeSecs[activeSecs.length - 1];
                const lastNavElement = document.getElementById(lastID + "Nav");
                if (lastNavElement) {
                    lastNavElement.classList.add("bgActive");
                    const originalText = lastNavElement.textContent;
                    jumbleText(lastNavElement, originalText);
                }
            }
        }
        console.log("👉👉" + secScrollY);
    });

}, { threshold: 1 });

sections.forEach(section => {
    observer.observe(section);
});
  
    function scrollUp(event) {
        let sectionID  = event.target.id;
        let properID = sectionID.slice(0, -3);
        console.log("🟥🟥🟥" + sectionID);
        console.log(properID);
        let targetWindowHeight;
        activeSecs.forEach(section => {
            console.log(section);
            if(section == properID) {
                let targetIndex = activeSecs.indexOf(section);
                targetWindowHeight = secScrollY[targetIndex] + 16;
                console.log("section name: " + section + ", target window height: " + targetWindowHeight);
            }
        });
    
        console.log("👉 " + event);
        console.log("CLICK CLICK");
        window.scrollTo({top: targetWindowHeight, behavior: 'smooth'});
    }

    function scrollToAnchor(event) {
        let sectionID  = event.target.id;
        let properID = sectionID.slice(0, -3);      
        let contactSec = document.getElementById(properID);
        contactSec.scrollIntoView({ behavior: "smooth" });
        console.log("MoVED");
    };
    
    function navClicks(event) {
        let properID = event.target.id.slice(0, -3);
        let flag = false;
        activeSecs.forEach(section => {
            if(section == properID) {
                flag = true;
            };
        })
        if(flag) {
            scrollUp(event);
            console.log("SCRUPP 🟦")
        } else {
            scrollToAnchor(event);
            console.log("ANCHOR 🟩")
        }
    }

    // onload
    window.onload = function() {
    let scrollPos = window.scrollY;
    let jumbleTitle = document.getElementById('shuffleTitle');
    let sideNav = document.getElementById('sideNav');
    let exerciseSection = document.getElementById('aboutSec');
    let exerciseSectionLink = document.getElementById('aboutSecLink');
  
    if (scrollPos < 100) {
        jumbleTitle.innerHTML = "NAT";
        jumbleTitle.style.transform = "translateY(0px)";
        sideNav.style.visibility = "visibile";
        sideNav.style.opacity = "0";
        sideNav.style.transform = "translateY(30px)";
    } else if (scrollPos < 300) {
      jumbleTitle.innerHTML = "GREEN";
      jumbleTitle.style.transform = "translateY(0px)";
    } else if (scrollPos < 600) {
      jumbleTitle.innerHTML = "PRODUCT";
      jumbleTitle.style.transform = "translateY(0px)";
    } else if (scrollPos < 900) {
      jumbleTitle.innerHTML = "DESIGNER";
      jumbleTitle.style.transform = "translateY(0px)";
      sideNav.style.opacity = "0";
      sideNav.style.transform = "translateY(30px)";
    } else if (scrollPos > 1200) {
      jumbleTitle.innerHTML = "DESIGNER";
      jumbleTitle.style.transform = "translateY(-40px)";
      jumbleTitle.style.opacity = "0";
      sideNav.style.visibility = "visible";
      sideNav.style.opacity = "1";
      sideNav.style.transform = "translateY(0px)";
    }

    };

  // title jumble
  
  document.addEventListener("scroll", () => {
    let scrollPos = window.scrollY;
    let jumbleTitle = document.getElementById('shuffleTitle');
    let sideNav = document.getElementById('sideNav');
    let starterPlant = document.getElementById('starterPlant');
    let scrollLander = document.getElementById('scrollLander');
    let exerciseSection = document.getElementById('aboutSec');
    let exerciseSectionLink = document.getElementById('aboutSecLink');
  
    if (scrollPos < 100) {
        jumbleTitle.innerHTML = "NAT";
        jumbleTitle.style.transform = "translateY(0px)";
        jumbleTitle.style.opacity = "1";
        starterPlant.style.transform = "translateY(0px)";
        starterPlant.style.opacity = "1";
        scrollLander.style.transform = "translateY(0px)";
        scrollLander.style.opacity = "1";
        sideNav.style.visibility = "visibile";
        sideNav.style.opacity = "0";
        sideNav.style.transform = "translateY(30px)";
    } else if (scrollPos < 300) {
      jumbleTitle.innerHTML = "GREEN";
      jumbleTitle.style.transform = "translateY(0px)";
      jumbleTitle.style.opacity = "1";
      starterPlant.style.transform = "translateY(0px)";
      starterPlant.style.opacity = "1";
      scrollLander.style.transform = "translateY(0px)";
      scrollLander.style.opacity = "1";
    } else if (scrollPos < 600) {
      jumbleTitle.innerHTML = "PRODUCT";
      jumbleTitle.style.transform = "translateY(0px)";
      jumbleTitle.style.opacity = "1";
      starterPlant.style.transform = "translateY(0px)";
      starterPlant.style.opacity = "1";
      scrollLander.style.transform = "translateY(0px)";
      scrollLander.style.opacity = "1";
    } else if (scrollPos < 900) {
      jumbleTitle.innerHTML = "DESIGNER";
      jumbleTitle.style.transform = "translateY(0px)";
      jumbleTitle.style.opacity = "1";
      starterPlant.style.transform = "translateY(0px)";
      starterPlant.style.opacity = "1";
      scrollLander.style.transform = "translateY(0px)";
      scrollLander.style.opacity = "1";
      sideNav.style.opacity = "0";
      sideNav.style.transform = "translateY(30px)";
    } else if (scrollPos > 1200) {
      jumbleTitle.innerHTML = "DESIGNER";
      jumbleTitle.style.transform = "translateY(-40px)";
      jumbleTitle.style.opacity = "0";
      starterPlant.style.transform = "translateY(-24px)";
      starterPlant.style.opacity = "0";
      scrollLander.style.transform = "translateY(-24px)";
      scrollLander.style.opacity = "0";
      sideNav.style.visibility = "visible";
      sideNav.style.opacity = "1";
      sideNav.style.transform = "translateY(0px)";
    }
  });
  
// Handle icon hover states
const iconWrappers = document.querySelectorAll('.iconWrapper');

iconWrappers.forEach(wrapper => {
    const img = wrapper.querySelector('.iconHStackItem');
    const originalSrc = img.src;
    const redSrc = originalSrc.replace('.svg', '_red.svg');
    
    wrapper.addEventListener('mouseover', () => {
        img.src = redSrc;
    });
    
    wrapper.addEventListener('mouseout', () => {
        img.src = originalSrc;
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const coverDivProjects = document.getElementById("coverDivProjects");
    const coverDivExercises = document.getElementById("coverDivExercises");
    const exercisesBody = document.getElementById("testDiv5");
    const exerciseBody = document.getElementById("exerciseSec");

    const sideNavItems = document.querySelectorAll(".sideNavItem"); // Adjust selector based on your actual structure


    // logic for when to set side nav to dark vs light

    /* function isProjectsInView(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return rect.top <= windowHeight * 0.25 && rect.bottom >= windowHeight * .1;
    }

    function isExercisesVisible(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return rect.top <= windowHeight * 0.25 && rect.bottom >= windowHeight * .1;
    }
    
    function isExercisesBodyVisible(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return rect.top <= windowHeight;
    }

    function isExerciseBodyVisible(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return rect.top <= windowHeight;
    }

    function updateSideNavItems() {
        const projectsInView = isProjectsInView(coverDivProjects);
        const exercisesVisible = isExercisesVisible(coverDivExercises);
        const exercisesBodyVisible = isExercisesBodyVisible(exercisesBody);
        const exerciseBodyVisible = isExerciseBodyVisible(exerciseBody);
        console.log(exercisesVisible, projectsInView, exercisesBodyVisible, exerciseBodyVisible);

        sideNavItems.forEach(item => {
            // alternate clean ternary operator version:
            item.style.color = (projectsInView && !exercisesVisible && !exerciseBodyVisible || exercisesBodyVisible && !exercisesVisible && !exerciseBodyVisible) ? "#1d2e21" : "";
            
            // original if else version:
            
            /* if ((projectsInView && !exercisesVisible && !exerciseBodyVisible) || (exercisesBodyVisible && !exercisesVisible && !exerciseBodyVisible)) {
                item.style.color = "#1d2e21"; // Set to dark color
            } else {
                item.style.color = ""; // Reset to original yellow color
            } 
        });
    } */
    

    

    window.addEventListener("scroll", updateSideNavItems);
    window.addEventListener("resize", updateSideNavItems);
    updateSideNavItems(); // Run once on load
});

    // cursor velocity line
    let lastX = 0, lastY = 0, lastTime = Date.now();

        let maxWidthHits = 0;    
        const counter = document.getElementById('cursVelMax');
        const counterData = document.getElementById('cursVelMaxData');
        const line = document.querySelector('.line');
        const maxWidth = 180;
        const defaultColor = '#65836d';
        const maxColor = '#FFEF9D';
        let isAtMaxWidth = false; // Tracks whether the line is visually at max width

        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            const deltaX = e.clientX - lastX;
            const deltaY = e.clientY - lastY;
            const deltaTime = now - lastTime;

            const speed = (Math.sqrt(deltaX ** 2 + deltaY ** 2) / deltaTime).toFixed(2); // Pixels per ms
            document.getElementById('cursVel').innerHTML = speed;

            lastX = e.clientX;
            lastY = e.clientY;
            lastTime = now;

            // Adjust line width based on speed
            const width = Math.min(maxWidth, 0 + speed * 100);
            line.style.width = `${width}px`;
        });

        // Detect when transition to max width is completed
        line.addEventListener('transitionend', () => {
            const computedWidth = parseFloat(getComputedStyle(line).width);

            if (computedWidth >= maxWidth && !isAtMaxWidth) {
                line.style.background = maxColor;
                counterData.style.color = maxColor;
                counter.style.color = maxColor;
                isAtMaxWidth = true;
                
                // Increment counter when max width is hit
                maxWidthHits++;
                counter.innerHTML = `${maxWidthHits}`;

            } else if (computedWidth < maxWidth && isAtMaxWidth) {
                line.style.background = defaultColor;
                isAtMaxWidth = false;
                counterData.style.color = defaultColor;
                counter.style.color = defaultColor;
            }
        });

    
/* // Add this function to scripts_folio.js

function fillEmptyGridCells() {
    const grid = document.querySelector('.newGrid');
    if (!grid) return;
    
    // Get all existing grid items (excluding filler items)
    const existingItems = Array.from(grid.querySelectorAll('.newGridItem:not(.filler-item)'));
    
    // Remove existing filler items
    const fillerItems = grid.querySelectorAll('.newGridItem.filler-item');
    fillerItems.forEach(item => item.remove());
    
    // Get computed grid styles
    const gridStyles = window.getComputedStyle(grid);
    const gridTemplateColumns = gridStyles.gridTemplateColumns;
    
    // Calculate number of columns
    // For auto-fill grids, we need to measure the actual layout
    const gridRect = grid.getBoundingClientRect();
    const firstItem = existingItems[0];
    if (!firstItem || existingItems.length === 0) return;
    
    const itemRect = firstItem.getBoundingClientRect();
    const gap = parseFloat(gridStyles.gap) || 0;
    const itemWidth = itemRect.width;
    const availableWidth = gridRect.width - parseFloat(gridStyles.paddingLeft) - parseFloat(gridStyles.paddingRight);
    
    // Calculate columns: (available width + gap) / (item width + gap)
    const columns = Math.floor((availableWidth + gap) / (itemWidth + gap));
    
    if (columns <= 0) return;
    
    // Calculate how many items are in the last row
    const totalItems = existingItems.length;
    const itemsInLastRow = totalItems % columns;
    
    // If last row is not full, add filler items
    if (itemsInLastRow > 0) {
        const fillerCount = columns - itemsInLastRow;
        
        // Array of image sources to use for fillers (you can customize this)
        const fillerImages = [
            'images/grad1.png',
            'images/grad2.png',
            'images/grad3.png',
            'images/Ecommerce Checkout.png',
            'images/Next Artwork.png',
            'images/redthing.png'
        ];
        
        for (let i = 0; i < fillerCount; i++) {
            const fillerItem = document.createElement('div');
            fillerItem.className = 'newGridItem filler-item';
            fillerItem.style.display = 'flex'; // Will be hidden if not needed
            
            const img = document.createElement('img');
            // Cycle through filler images
            const imgSrc = fillerImages[i % fillerImages.length];
            img.src = imgSrc;
            img.alt = '';
            
            fillerItem.appendChild(img);
            grid.appendChild(fillerItem);
        }
    }
}

// Debounce function to optimize resize performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Use ResizeObserver for better performance (watches grid size changes)
function initGridFiller() {
    const grid = document.querySelector('.newGrid');
    if (!grid) return;
    
    // Initial fill
    fillEmptyGridCells();
    
    // Use ResizeObserver to watch for grid size changes
    const resizeObserver = new ResizeObserver(debounce(() => {
        fillEmptyGridCells();
    }, 150));
    
    resizeObserver.observe(grid);
    
    // Also listen to window resize as fallback
    window.addEventListener('resize', debounce(() => {
        fillEmptyGridCells();
    }, 150));
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initGridFiller();
});

// Also run after images load to account for layout shifts
window.addEventListener('load', () => {
    setTimeout(fillEmptyGridCells, 100);
});
   */
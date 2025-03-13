// test div resize



    function updateSideNavHeight() {
        console.log("viewport width: " + window.innerWidth);
        let viewportHeight = window.innerHeight;
        let viewportWidth = window.innerWidth;
        
        // set heights
        document.getElementById("testDiv1").style.height = (viewportHeight - 32) + "px";
        document.getElementById("testDiv5").style.height = (viewportHeight - 32) + "px";
        document.getElementById("sideNav").style.height = (viewportHeight - 120) + "px";
        
        // set widths        
        document.getElementById("mainContentDiv").style.width = (viewportWidth - 240) + "px";
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
    window.addEventListener("load", updateSideNavHeight);
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
            "Projects",
            "Mobile apps",
            "Websites",
            "Web apps"
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
                        verticalLine.style.height = "100%";
                    }
                    if (rect.top <= 0) {
                        // Start cycling titles
                        if (!titleInterval) {
                            titleInterval = setInterval(cycleTitles, 3000);
                        }
                    }
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

        revealObserver.observe(aboutSec);

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

        projectObserver.observe(wipeAwaySec);

        // Set initial state for project items
        projectItems.forEach(item => {
            item.style.opacity = "0";
            item.style.transform = "translateY(-50px)";
            item.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        });
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

    function isProjectsInView(el) {
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
            } */
        });
    }
    

    

    window.addEventListener("scroll", updateSideNavItems);
    window.addEventListener("resize", updateSideNavItems);
    updateSideNavItems(); // Run once on load
});
  
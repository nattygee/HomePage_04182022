// test div resize



    function updateSideNavHeight() {
        let viewportHeight = window.innerHeight;
        document.getElementById("testDiv1").style.height = (viewportHeight - 40) + "px";
        document.getElementById("testDiv2").style.height = (viewportHeight - 40) + "px";
        document.getElementById("sideNav").style.height = (viewportHeight - 120) + "px";
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
    const coverDiv = document.getElementById("coverDivProjects");
    const revealItems = document.querySelectorAll("#natwalk, #sibling1, #sibling2");
    const projectItems = document.querySelectorAll("#project1, #project2, #project3");
    const sideNavNat = document.getElementById("sideNavNat");

    let hasScrolledPast = false;
    let hasScrolledPastProjects = false;
    let hasAnimatedLines = false;

    // Add styles for the lines
    const style = document.createElement('style');
    style.textContent = `
        .animatedLines {
            position: absolute;
            right: 700px;
            top: 50%;
            transform: translateY(-50%);
            width: 100%;
            pointer-events: none;
        }
        .line {
            position: absolute;
            right: 0;
            height: 1px;
            background-color: #FFEF9D;
            transform-origin: right;
            transform: scaleX(0);
            transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .line1 {
            width: 180px;
            top: -240px;
            right: -200px;
        }
        .line2 {
            width: 150px;
            top: 0;
        }
        .line3 {
            width: 180px;
            top: 100px;
        }
        .line.animate {
            transform: scaleX(1);
        }
        .projectsCardWrapper {
            position: absolute;
            right: 500px;
            top: 60px;
            transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .projectsCardWrapper.translated {
            transform: translateX(-240px);
        }
        #projectsCard1 {
            position: relative;
            animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
            0% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-20px);
            }
            100% {
                transform: translateY(0px);
            }
        }
        .previewImg {
            transition: transform 0.2s ease, height 0.2s ease;
        }
        .imageFullContainer {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.9);
            z-index: 99999;
            display: none;
            justify-content: center;
            align-items: center;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
        }
    `;
    document.head.appendChild(style);

    // Add cursor interaction
    const projectsCard = document.getElementById('projectsCard1');
    const cardRect = projectsCard.getBoundingClientRect();
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Calculate distance between cursor and card center
        const distanceX = mouseX - cardCenterX;
        const distanceY = mouseY - cardCenterY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        // If cursor is within 200px of the card
        if (distance < 200) {
            // Calculate repulsion direction
            const repulsionX = (distanceX / distance) * 20;
            const repulsionY = (distanceY / distance) * 20;
            
            // Apply repulsion transform
            projectsCard.style.transform = `translate(${repulsionX}px, ${repulsionY}px)`;
        } else {
            // Reset transform when cursor is far
            projectsCard.style.transform = 'translate(0px, 0px)';
        }
    });

    // Observer for the cover div animation
    const coverObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimatedLines) {
                hasAnimatedLines = true;
                const lines = document.querySelectorAll('.line');
                lines.forEach((line, index) => {
                    setTimeout(() => {
                        line.classList.add('animate');
                    }, index * 300);
                });
                
                // Add diagonal translation for projectsCard1
                const projectsCardWrapper = document.querySelector('.projectsCardWrapper');
                setTimeout(() => {
                    projectsCardWrapper.classList.add('translated');
                }, 300);
            }
        });
    }, { threshold: 0.4 });

    coverObserver.observe(coverDiv);

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
    }, { threshold: 1 });

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

// Function to jumble text
function jumbleText(element, originalText, duration = 1000) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let startTime = null;
    let animationFrame;
    const startScrambleDuration = 300; // Time for letters to start scrambling in sequence
    const allScrambleDuration = 400; // All letters scramble together
    const settleDuration = 600; // Time for characters to settle in sequence
    const startCharDelay = startScrambleDuration / originalText.length; // Delay between each character starting to scramble
    const settleCharDelay = settleDuration / originalText.length; // Delay between each character settling
    
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
                    // During start phase, characters begin scrambling in sequence
                    const charStartProgress = Math.max(0, Math.min(1, (elapsed - (i * startCharDelay)) / startCharDelay));
                    if (charStartProgress > 0) {
                        // Character has started scrambling
                        jumbledText += characters[Math.floor(Math.random() * characters.length)];
                    } else {
                        // Character hasn't started scrambling yet
                        jumbledText += originalText[i];
                    }
                } else if (isInAllScramblePhase) {
                    // During all-scramble phase, all characters scramble
                    jumbledText += characters[Math.floor(Math.random() * characters.length)];
                } else {
                    // During settle phase, characters settle in sequence
                    const charSettleProgress = Math.max(0, Math.min(1, (settlePhaseElapsed - (i * settleCharDelay)) / settleCharDelay));
                    
                    if (charSettleProgress >= 1) {
                        // Character has settled
                        jumbledText += originalText[i];
                    } else {
                        // Character is still scrambling
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
      jumbleTitle.style.transform = "translateY(-400px)";
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
      jumbleTitle.style.transform = "translateY(-400px)";
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
  
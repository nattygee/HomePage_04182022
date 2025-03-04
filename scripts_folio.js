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
    
    function toggleDisplay(event) {
        proj1FullView.style.display = event.type === "mouseover" ? "flex" : "none";
        projImages.style.height = event.type === "mouseover" ? "32px" : "24px";
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
            width: 600px;
            top: -110px;
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
    `;
    document.head.appendChild(style);

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
    // Use characters that are similar in width to maintain layout
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let startTime = null;
    let animationFrame;
    
    // Easing function for smooth transitions with reduced intensity
    function easeInOut(t) {
        // Calculate base easing
        const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        // Reduce intensity by 50% by using square root of the squared value
        return Math.sqrt(eased * eased * 0.5);
    }
    
    function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        if (progress < 1) {
            // Generate random text with exact same length as original
            let jumbledText = '';
            for (let i = 0; i < originalText.length; i++) {
                // Preserve spaces and dots
                if (originalText[i] === ' ' || originalText[i] === '.') {
                    jumbledText += originalText[i];
                } else {
                    // Use easing to control how often we change characters
                    const shouldChange = Math.random() < easeInOut(progress);
                    if (shouldChange) {
                        jumbledText += characters[Math.floor(Math.random() * characters.length)];
                    } else {
                        jumbledText += originalText[i];
                    }
                }
            }
            element.textContent = jumbledText;
            
            animationFrame = requestAnimationFrame(animate);
        } else {
            // Restore original text
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
  

  
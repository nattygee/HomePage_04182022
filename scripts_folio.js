// test div resize



function updateSideNavHeight() {
    let viewportHeight = window.innerHeight;
    document.getElementById("testDiv1").style.height = (viewportHeight - 40) + "px";
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
    const wipeAwaySec = document.getElementById("wipeAwaySec1");
    const revealItems = document.querySelectorAll("#natwalk, #sibling1, #sibling2");

  
    

    let hasScrolledPast = false; // ✅ Prevents triggering on first load

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
                hasScrolledPast = true; // ✅ Now we allow re-reveals
                revealItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = "0";
                        item.style.transform = "translateY(-50px)";
                    }, index * 200);
                });
            } else if (entry.boundingClientRect.top > 0 && hasScrolledPast) { 
                // ✅ Only allow re-reveal after user has scrolled past once
                console.log("Re-revealing elements...");
                revealItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = "1";
                        item.style.transform = "translateY(0px)";
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.1 }); // ✅ Low threshold to trigger just before leaving

    wipeObserver.observe(wipeAwaySec);
});


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
                    document.getElementById(section + "Nav")?.classList.remove("bgActive");
                });
    
                // Add active class to the current one
                document.getElementById(activeSectionID + "Nav")?.classList.add("bgActive");
            } else {
                let index = activeSecs.indexOf(activeSectionID);
                if (index !== -1) {
                    activeSecs.splice(index, 1);
                    secScrollY.splice(index, 1);
                    localStorage.setItem("secScrollY", JSON.stringify(secScrollY));
                    localStorage.setItem("activeSecs", JSON.stringify(activeSecs));
                }
    
                document.getElementById(activeSectionID + "Nav")?.classList.remove("bgActive");
    
                if (activeSecs.length > 0) {
                    let lastID = activeSecs[activeSecs.length - 1];
                    document.getElementById(lastID + "Nav")?.classList.add("bgActive");
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
  

  
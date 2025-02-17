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
  
  // alternative anchor scroll
  
  /* document.querySelectorAll(".sideNavList a").forEach(anchor => {
    anchor.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent default anchor behavior
  
        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
  
        if (targetSection) {
            const offset = 80; // Adjust this if needed based on your header height
            const targetPosition = targetSection.offsetTop - offset;
  
            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        }
    });
  }); */
  
  // SCROLL on CLICK
  // not working on the way up. Wondering if it's possible to get the scroll y position when target div first instersects
  // then use scroll y to scroll to that position on the way up? But that would prolly conflict with with anchors on the way down?
  // store the scroll y in an array that maps to the intersecting sections array
  // if section link is clicked, and it's intersecting, get it's corresponding scroll Y in the array and scroll there
  
  
  // need to reset arrays on page load down the page 🚨🚨🚨
  
    const sections = document.querySelectorAll(".folioSection");
    const navLinks = document.querySelectorAll(".sideNavList a");
    let activeSecs = [];
    let secScrollY = [];
    
  
    // Create an Intersection Observer
    const observer = new IntersectionObserver(entries => {
     console.log(entries);
     entries.forEach(entry => {
        let activeSectionID = entry.target.id
        const targetLink = document.querySelector(`.sideNavList a[href="#${activeSectionID}"]`);
        if(entry.isIntersecting) {
          activeSecs.push(activeSectionID);
          secScrollY.push(scrollY);
            // now we want everything before the newly added item to remove active class
            // loop through array > for each array item find the side nav element & remove the active class
            activeSecs.forEach(section => {
              document.querySelector(`.sideNavList a[href="#${section}"]`).classList.remove("active");
              document.getElementById(section + 'Nav').classList.remove("bgActive");
            });
            targetLink.classList.add("active");
            document.getElementById(activeSectionID + 'Nav').classList.add("bgActive");  
        } else {
          targetLink.classList.remove("active");
          document.getElementById(activeSectionID + 'Nav').classList.remove("bgActive");
          activeSecs.pop();
          secScrollY.pop();
          let lastID = activeSecs[activeSecs.length-1];
          document.querySelector(`.sideNavList a[href="#${lastID}"]`).classList.add("active");
          document.getElementById(lastID + 'Nav').classList.add("bgActive");
        }
        console.log(activeSecs);
        console.log(secScrollY);
        console.log(window.scrollY);
     });
    }, {
      threshold: 1,
    });
  
    sections.forEach(section => {
      observer.observe(section)
    });
  
    function scrollUp(event) {
        let sectionID  = event.target.id;
        let properID = sectionID.slice(0, -3);
        console.log(sectionID);
        console.log(properID);
        let targetWindowHeight;
        activeSecs.forEach(section => {
            console.log(section);
            if(section == properID) {
                let targetIndex = activeSecs.indexOf(section);
                targetWindowHeight = secScrollY[targetIndex];
                console.log("section name: " + section + ", target window height: " + targetWindowHeight);
            }
        });
    
        console.log("👉 " + event);
        console.log("CLICK CLICK");
        window.scrollTo({top: targetWindowHeight, behavior: 'smooth'});
      }


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
  
  // sticky sections?
  
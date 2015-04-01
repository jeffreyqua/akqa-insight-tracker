  departmentBeacons = [
    [51523, [
      [17688, 'circle', '$32.00'], 
      [16640, 'square', '$124.00'], 
      [16114, 'pentagon', '$23.00'], 
      [52030, 'triangle', '$1543.00']
      ]
    ],
    [20698, [
      [22358, 'triangle', '$1440.00'], 
      [31817, 'square', '$2138.00']
      ]
    ]
  ];

// state variable
uiState = 0;

  (function(){
      var myFirebaseRef = new Firebase("https://radiant-torch-4888.firebaseio.com");
      myFirebaseRef.on('child_changed', function(childSnapshot, prevChildName){
        var beaconId = childSnapshot.val()['id'];
        console.log(beaconId);

        // Detect beacon changes

        // Green Circle - Electronics
        if (beaconId === 31817 || beaconId === 22358 || beaconId === 20698) {
          moveJordan(1);
        }
        // Red Triangle - Sports
        else if (beaconId === 52030 || beaconId === 16640) {
          moveJordan(4);
        }
        // Red Pentagon - Sports
        else if (beaconId === 16114 || beaconId === 17688) {
          moveJordan(3);
        }


        $('.column h1').text(beaconId);
        var deptId = getBeaconDeptIdById(beaconId);
        var colorId = getDeptColorByDeptId(deptId, beaconId);
        var iconId = getBeaconIconById(deptId, beaconId);
        if (colorId === 'blue') {
          // TweenMax.to('.column-1', 0.8, {width:'60%', ease: Power1.easeInOut});
          // TweenMax.to('.column-2', 0.8, {width:'40%', ease: Power1.easeInOut});
          // TweenMax.to('.spot', 1.2, {left: '29%', ease: Power4.easeInOut});
        }
        if (colorId === 'orange') {
          // TweenMax.to('.column-2', 0.8, {width:'60%', ease: Power1.easeInOut});
          // TweenMax.to('.column-1', 0.8, {width:'40%', ease: Power1.easeInOut});
          // TweenMax.to('.spot', 1.2, {left: '69%', ease: Power4.easeInOut});
        }
        //TweenMax.to('.'+iconId, 0.5, {marginTop: '-=50px', delay: 1});
      });


  })();

  // Change website state
  function triggerWebState(dir) {
    // next
    if (dir == 1) {
      uiState++;
      // Max out at 2 states
      if (uiState >= 2) {
        uiState = 2;
      }
    }

    // prev
    else if (dir == 0) {
      uiState--;
      if (uiState<0) {
        uiState = 0;
      }
    }

    // Update
    updateUIState();
  }

  function updateUIState() {
    // Update UI State
    if (uiState == 2) {
      $('html').addClass('state3');
    }
    else if (uiState == 1) {
      $('html').addClass('state2');
      $('html').removeClass('state3');
    }
    else if (uiState == 0) {
      $('html').removeClass('state2');
    }
  }

  // Trigger View State
  function triggerView(state) {
    if (state ==0) {
      // website view
      $('html').removeClass('store-view');
    }
    else {
      $('html').addClass('store-view'); 
    }
  }

  // Trigger Entry State
  function triggerEntry(state) {
    if (state == 0) {
      // website view
      $('html').removeClass('entry-view');
    }
    else {
      $('html').addClass('entry-view'); 
    }
  }

  function moveJordan(product) {
    if (product==1) {
      $('#jordan').addClass('position1');
      $('#jordan').removeClass('position4 position2 position3');

      $('#product1').addClass('animated bounce').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', 
        function() {
          $(this).removeClass('animated bounce');
        });
    }
    else if (product==2) {
      $('#jordan').addClass('position2');
      $('#jordan').removeClass('position1 position3 position4');
      
      $('#product2').addClass('animated bounce').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', 
        function() {
          $(this).removeClass('animated bounce');
        });
    }
    else if (product==3) {
      $('#jordan').addClass('position3');
      $('#jordan').removeClass('position1 position2 position4');
      
      $('#product3').addClass('animated bounce').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', 
        function() {
          $(this).removeClass('animated bounce');
        });
    }
    else if (product==4) {
      $('#jordan').addClass('position4');
      $('#jordan').removeClass('position1 position2 position3');
      
      $('#product4').addClass('animated bounce').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', 
        function() {
          $(this).removeClass('animated bounce');
        });
    }
  }



  function getBeaconDeptIdById(beaconId) {
    var departments = departmentBeacons;
    var deptId;
    for (var i = 0; i < departments.length; i++) {
        var departmentProducts = departments[i][1];
        for (var j = 0; j < departmentProducts.length; j++) {
          if (beaconId == departmentProducts[j][0]) {
            deptId = departments[i][0];
            break;
          } else {
            deptId = 'NA';
          }
        }
    }
    return deptId;
  }

  function getDeptColorByDeptId(deptId, beaconId) {
    if(deptId == 20698 || beaconId == 20698) return 'blue';
    if(deptId == 51523 || beaconId == 51523) return 'orange';
  }

  function getBeaconIconById(departmentId, beaconId) {
    var departments = departmentBeacons;
    var iconId;

    for (var i = 0; i < departments.length; i++) {
      if (departmentId == departments[i][0]) {
        var departmentProducts = departments[i][1];
        for (var j = 0; j < departmentProducts.length; j++) {
          if (beaconId == departmentProducts[j][0]) {
            iconId = departmentProducts[j][1];
            break;
          } else {
            iconId = 'NA';
          }
        }
      }
    }
    return iconId;

  }


$(document).on("keypress", function (e) {
  // console.log(e.charCode);

  // a and q for state
  if (e.charCode == 81 || e.charCode == 113) {
    // letter 'q' pressed
    // console.log('q');
    triggerWebState(0);
  }
  else if (e.charCode == 65 || e.charCode == 97) {
    // letter 'a' pressed
    // console.log('a');
    triggerWebState(1);
  }

  // '[' and ']' for view
  if (e.charCode == 91) {
    // '[' pressed
    triggerView(0);
  }
  else if (e.charCode == 93) {
    // ']' pressed
    triggerView(1);
  }

  // ';' and "'" for entry/exit

  if (e.charCode == 59) {
    // ';' pressed - exit
    triggerEntry(0);
  }
  else if (e.charCode == 39) {
    // "'" pressed - entry
    triggerEntry(1);
  }


  // z / x / c / v - 4product test
  if (e.charCode == 122) {
    // 'z' pressed - product1
    moveJordan(1);

  }
  else if (e.charCode == 120) {
    // "x" pressed - product2
    moveJordan(2);
  }
  else if (e.charCode == 99) {
    // "c" pressed - product3
    moveJordan(3);
  }
  else if (e.charCode == 118) {
    // "v" pressed - product4
    moveJordan(4);
  }

  if (e.charCode == 47) {
    // '/' pressed - default

    $('#jordan').removeClass('position1 position2 position3 position4');
  }
});
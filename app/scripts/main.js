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

  function triggerState(dir) {
    // next
    if (dir == 1) {
      uiState++;
      if (uiState > 3) {
        uiState = 3;
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
    if (uiState == 1) {
      $('html').addClass('state2');
    }
    else if (uiState == 0) {
      $('html').removeClass('state2');
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
  // use e.which
  console.log(e.charCode);
  if (e.charCode == 81 || e.charCode == 113) {
    // letter 'q' pressed
    console.log('q');
    triggerState(0);
  }
  else if (e.charCode == 65 || e.charCode == 97) {
    // letter 'a' pressed
    console.log('a');
    triggerState(1);
  }
});
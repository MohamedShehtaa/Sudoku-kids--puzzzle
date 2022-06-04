window.addEventListener('load', function () {
  //#region variables
  let level = this.localStorage.getItem('selectValue');
  let imagesContainer = document.querySelectorAll('.images');
  let GroupsButtons = this.document.querySelectorAll('.btnGroup');
  //#endregion

  //put images on level Easy
  if (level == 'level1') {
    let groupNumber = 1;
    imagesContainer.forEach((group) => {
      generateImagesEasyLevel(group, groupNumber);
      groupNumber++;
    });
  }
  //put images on level hard
  if (level == 'level2') {
    let groupNumber = 1;
    imagesContainer.forEach((group) => {
      generateImagesHardLevel(group, groupNumber);
      groupNumber++;
    });
  }
  //click on any Group
  GroupsButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
      let imagesObj = {};
      let imagesGroup = document.querySelectorAll(
        `.${this.innerText.toLowerCase()} img`,
      );
      imagesGroup.forEach((image) => {
        imagesObj[image.id] = image.src;
      });
      let sentImagesObj = JSON.stringify(imagesObj);
      localStorage.setItem('groupImages', sentImagesObj);
      window.location.href = '../thirdPage/thirdPage.html';
    });
  });
});

//image for easy level
function generateImagesEasyLevel(group, groupNumber) {
  let img = document.createElement('img');
  for (let i = 1; i <= 4; i++) {
    img = document.createElement('img');
    img.src = `../images/group${groupNumber}/${i}.jpg`;
    img.id = `${i}`;
    group.append(img);
  }
}
//image for hard level
function generateImagesHardLevel(group, groupNumber) {
  let img = document.createElement('img');
  for (let i = 1; i <= 9; i++) {
    img = document.createElement('img');
    img.src = `../images/group${groupNumber}/${i}.jpg`;
    img.id = `${i}`;
    group.append(img);
  }
}

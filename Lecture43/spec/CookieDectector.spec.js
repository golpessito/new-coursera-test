describe("CookieDector",function(){
  var itemsWithoutCookies;
  var itemsWithCookies;

  beforeEach(function(){
    itemsWithoutCookies=["apples","peas","bananas"];
    itemsWithCookies=["bread","Milk","Cookies"];
  });

it("should be enabled to detect no cookies",function(){
  var result= detectCookie(itemsWithoutCookies);
  expect(result).not.toBe(true);
});

it("should be enabled to detect cookies",function(){
  var result= detectCookie(itemsWithCookies);
  expect(result).toBe(true);
});

});

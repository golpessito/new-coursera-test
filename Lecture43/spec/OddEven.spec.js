describe("OddEvenGenerator",function(){
  var RandomGenerator8;
  var RandomGenerator3;

  beforeEach(function(){
    RandomGenerator8=function(to, from){
      return 8;
    };

    RandomGenerator3=function(to, from){
      return 3;
    };
  });

  it("should be produce a odd number",function(){
    var result=getRandomOddOrEven1to10("odd",RandomGenerator3);
    expect(result).toEqual(3);
  });

  it("should be produce a even number",function(){
    var result=getRandomOddOrEven1to10("even",RandomGenerator8);
    expect(result).toEqual(8);
  });

});

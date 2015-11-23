#AliasCSS
###3AliasCss is  css processor that opena a new way of styling your webpages. Technically  it a library of  css + javascript that makes your coding \(styling\)easier, faster and experimentable with very ease.It brings forth a diffrent kind of CSS styling approach. 
##3Intro Video :ALiasCSS
[![Alt AliasCSS Introduction](http://img.youtube.com/vi/6k9j9uz8V-s/0.jpg)](https://youtu.be/6k9j9uz8V-s)
##Getting Started
###Installation
#####There are two major files in ACSS one is css and another is javascript file.The css file includes all classnames that doesnot require to be compiled. It should be alway used. The javascript file complies the valid ACSS classNames to corresponding defination and outputs in html document under style tag with id "styleAlias", these classenamess can be moved anywhere in internal or external stylesheet
###Let's start exploring AliassCSS with simple template.
```html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
   
    <title>AliasCSS Template</title>

    <!-- AliasCSS -->
    <link href="css/alias.min.css" rel="stylesheet">

  </head>
  <body>
    <h1 class="fw6 br5px bgc_hccc c_ngreen p10px dib">Hello, world!</h1>
  </body>
  <script src="js/alias.min.js"></script>
</html>
```
####How it works
"In AliasCSS , normally every Aliascss's className holds single property and value/s for it. "
In the above example, look at class attribute of h1 element i.e \<h1 class="fw6 br5px bgc_hccc c_ngreen p10px dib"\\>Hello, world\!\</h1\>. This is just ordinary h1 element with class "fw6 br5px bgc_hccc c_ngreen p10px dib". But the classes defined holds special meaning, they are not just classnames they are also aliases of className property and values in the form of classnames----which is compiled to a corresponding property and value by ACSS .
*fw6 alias for font-wight:600br5px alias for border-radius:5px

bgc_hccc alias for background-color:#ccc, here c_h means color by hexadecimal if you want color by name simply use c_n e.g bgc_nred
####Rules
1.The first letter of each Property and vlaue is picked for defining className, for eg. dn represent display:none; pf represent position:fixed , that mean if you want to give element a style position to fixed , with AliasCSS you just need to add className "pf" in the element , if you want give above h1 element a fixed position then it looks like
```<h1 class="fw6 br5px bgc_hccc c_ngreen p10px dib pf">Hello, world!</h1>
```
2.If property or value has hyphen/s(-), the respective alias is build from the first letter of property plus first-letter after hyphen/s, for e.g. the alias of font-weight is represented by fw in className.ie fw9 font-weight:900, for e.g of value with hypens, lets take display:inline-block , if we have to define that style for our element we can simply add dib to class attribute where each letter of 'dib' represents disply,inline,block respectively.In this case ib is picked using above method, there is also few expection for these rule. see documenation for details under exception.
In general , first letter of every words of property and value are used to build the className for element.
3.Some className uses addtional character either hyphen(-) and underscore( _ ),these are used basically in advance and complicated className defination such as tranform, transition, font, color etc .Here are few examples:
c_ stands for color property

ff_ stands for font-family

t_ stands for transition

m10px stands for margin:10px and m-10px stands for margin:-10px

m10px10px means margin:10px 10px , and margin m10px10px20px5px means margin:10px 10px 20px 5px

Margin and padding works in similar fashion also to use percentage , just replace % by p i.e. m10p means margin:10%, this is due to className naming convention '%' is not allowed to include in naming className.
Use [Live Demo](http://aliascss.com/demo.html) to experiment and learn practically. First watch the video how to use live demo interface.

Watch few min video to understand AliasCSS Live Demo Interface.
[![Alt AliasCSS Live Demo Introduction](http://img.youtube.com/vi/2cSxgnlIYJY/0.jpg)](https://youtu.be/2cSxgnlIYJY)

For more details see [documentation](http://aliascss.com/http://aliascss.com/doc.html#documentation)


      function displayValue(fieldVal)
	  {
	     //fieldValue = document.myform.field1.value;
	     //fieldValue = document.forms[0].elements[0].value;
	     //fieldValue = document.forms[0].elements[1].value;
		 alert(fieldVal);
		 //alert(document.myform.field1.value);
	  }
	  
	  function validate(form)
	  {
	   /* Another way: no loop  -- Why checking only 3 form elements
	     isValid = true;
		 if (form.elements[0].value == "")
		    isValid = false;
		 if (document.forms[0].elements[1].value == "")
		    isValid = false;
		 if (document.forms[0].elements[2].value == "")
		    isValid = false;
		 if (isValid == false)
		    alert("There is an empty field");
		 return isValid;
		 alert("returning to the form");
		*/
 
		 for (i=0; i<form.elements.length; i++)
		 {
		    if (form.elements[i].value == "")
			{
			   alert("There is an empty field");
			   form.elements[i].focus();
			   return false;
			}
		 }
		 return true;
	  }

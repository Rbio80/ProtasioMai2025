var ulMaxX;
var ulMaxY;
var ulDescendantCount;

function LoadTree(FamilyDiv, id)
{
	var s="";
	var infoConjoint = { ind : "0", nom : "1", prenom : "2"};	

	document.getElementById('FamilyTree').style.width = 20000;
	document.getElementById('FamilyTree').style.height = 4000;
	ulDescendantCount=0;
	nom=lst_family[id][0];
	prenom=lst_family[id][1];
//	pere=lst_family[id][2];
//	mere=lst_family[id][3];
//	if(pere==null && mere==null)
	{
		lstIdConjoint=DonneConjoint(id);
		if(lstIdConjoint.length==0)
		{
			s=s+"<ul><li>";
			s=s+"<a href=\"fiche.htm?IND="+id+"\" onmouseover=\"ShowIndInfo("+id+")\"><b>"+lst_names[nom]+" "+lst_first_names[prenom]+"</b>";
			s=s+"</a>";
			s=s+DisplayChildren(id);
			s=s+"</li></ul>";
		}
		else if(lstIdConjoint.length==1)
		{
			s=s+"<ul><li>";
			s=s+"<a href=\"fiche.htm?IND="+id+"\" onmouseover=\"ShowIndInfo("+id+")\"><b>"+lst_names[nom]+" "+lst_first_names[prenom]+"</b>";
			DonneInfoConjoint(lstIdConjoint[0], infoConjoint)
			s=s+"<br>"+lst_names[infoConjoint.nom] + " " + lst_first_names[infoConjoint.prenom];
			s=s+"</a>";
			s=s+DisplayChildren(id);
			s=s+"</li></ul>";
		}
		else
		{
			s=s+"<ul class=pere_couple>";
			s=s+"<li>";
			s=s+"<a href=\"fiche.htm?IND="+id+"\" onmouseover=\"ShowIndInfo("+id+")\"><b>"+lst_names[nom]+" "+lst_first_names[prenom]+"</b>";
			s=s+"</a>";
			s=s+"<ul class=couple>";
			for(iCptConjoint=0;iCptConjoint<lstIdConjoint.length;iCptConjoint++)
			{
				s=s+"<li class=couple>";
				nom=lst_family[id][0];
				prenom=lst_family[id][1];
				s=s+"<a href=\"fiche.htm?IND="+id+"\" onmouseover=\"ShowIndInfo("+id+")\">";
				DonneInfoConjoint(lstIdConjoint[iCptConjoint], infoConjoint)
				s=s+lst_names[infoConjoint.nom] + " " + lst_first_names[infoConjoint.prenom];
				s=s+"</a>";
				s=s+DisplayChildrenCouple(id, lstIdConjoint[iCptConjoint]);
				s=s+"</li>";
			}
			s=s+"</ul>";
			s=s+"</li>";
			s=s+"</ul>";
		}
	}
	FamilyDiv.innerHTML=s;
	ulMaxX=0;
	ulMaxY=0;
	getCoord(document.getElementById("FamilyTree"));
//	alert(ulMaxX);
	document.getElementById('FamilyTree').style.width = ulMaxX+50;
	document.getElementById('FamilyTree').style.height = ulMaxY+50;
//	alert(document.getElementById('FamilyTree').style.width);
}

function DisplayChildrenCouple(FatherId, MotherId)
{
	var conjoint = { ind : "0", nom : "1", prenom : "2"};	
	var s="";
	var bPremier=true;
	
	for(var id= 0; id < lst_family.length; id++)
	{
		nom=lst_family[id][0];
		prenom=lst_family[id][1];
		pere=lst_family[id][2];
		mere=lst_family[id][3];
		if((pere==FatherId && mere==MotherId) || (pere==MotherId && mere==FatherId))
		{
			s=s+"<li class=enfant>";
			s=s+"<a href=\"fiche.htm?IND="+id+"\" onmouseover=\"ShowIndInfo("+id+")\"><b>"+lst_names[nom]+" "+lst_first_names[prenom]+"</b>";
			if(DonneListeInfoConjoints(id, conjoint)==true)
			{
				if(conjoint.nom!=null && conjoint.prenom!=null)
				{
					s=s+"<br>"+lst_names[conjoint.nom] + " " + lst_first_names[conjoint.prenom];
				}
				else if(conjoint.nom!=null)
				{
					s=s+"<br>"+lst_names[conjoint.nom] + " ?";
				}
				else if(conjoint.prenom!=null)
				{
					s=s+"<br>? "+lst_first_names[conjoint.prenom];
				}
			}
			s=s+"</a>";
			ulDescendantCount++;
			if(ulDescendantCount<100)
			{
				s=s+DisplayChildren(id);
			}
			s=s+"</li>";
		}
	}
	if(s!="")
	{
		s="<ul>"+s+"</ul>";
	}
	return s;
}

function DisplayChildren(FatherId)
{
	var conjoint = { ind : "0", nom : "1", prenom : "2"};	
	var s="";
	var bPremier=true;
	
	for(var id= 0; id < lst_family.length; id++)
	{
		nom=lst_family[id][0];
		prenom=lst_family[id][1];
		pere=lst_family[id][2];
		mere=lst_family[id][3];
		if(pere==FatherId || mere==FatherId)
		{
			s=s+"<li>";
			s=s+"<a href=\"fiche.htm?IND="+id+"\" onmouseover=\"ShowIndInfo("+id+")\"><b>"+lst_names[nom]+" "+lst_first_names[prenom]+"</b>";
			if(DonneListeInfoConjoints(id, conjoint)==true)
			{
				if(conjoint.nom!=null && conjoint.prenom!=null)
				{
					s=s+"<br>"+lst_names[conjoint.nom] + " " + lst_first_names[conjoint.prenom];
				}
				else if(conjoint.nom!=null)
				{
					s=s+"<br>"+lst_names[conjoint.nom] + " ?";
				}
				else if(conjoint.prenom!=null)
				{
					s=s+"<br>? "+lst_first_names[conjoint.prenom];
				}
			}
			s=s+"</a>";
			ulDescendantCount++;
			if(ulDescendantCount<100)
			{
				s=s+DisplayChildren(id);
			}
			s=s+"</li>";
		}
	}
	if(s!="")
	{
		s="<ul>"+s+"</ul>";
	}
	return s;
}

function getCoord(elem)
{
	var i;
	for (i = 0; i < elem.children.length; i++)
	{
		if(elem.children[i].tagName=="A")
		{
			if(elem.children[i].getBoundingClientRect().right>ulMaxX)
			{
				ulMaxX=elem.children[i].getBoundingClientRect().right;
			}
			if(elem.children[i].getBoundingClientRect().bottom>ulMaxY)
			{
				ulMaxY=elem.children[i].getBoundingClientRect().bottom;
			}
		}
		else
		{
			getCoord(elem.children[i]);
		}
	}
}

function DisplayFamilyNames(DivList)
{
	var s="";
	var nom;
	var prenom;
	var pere;
	var mere;
	
	for(var id= 0; id < lst_family.length; id++)
	{
		nom=lst_family[id][0];
		prenom=lst_family[id][1];
		pere=lst_family[id][2];
		mere=lst_family[id][3];
		if(pere==null && mere==null)
		{
			if(ConjointPossedeParents(id)==false)
			{
				if(EstUnHomme(id)==true)
				{
					ulDescendantCount=0;
					GetDescendantCount(id);
					if(ulDescendantCount>5)
					{
						s=s+"<a href=\"fiche.htm?IND="+id+"\" onClick='LoadTree(document.getElementById(\"FamilyTree\"),"+id+")'>"+lst_names[nom]+" "+lst_first_names[prenom];
						s=s+"&nbsp;("+ulDescendantCount+")</a><br>";
					}
				}
			}
		}
	}
	DivList.innerHTML=s;
}

function GetDescendantCount(idInd)
{
	var id;
	
	for(id=0;id<lst_family.length;id++)
	{
		pere=lst_family[id][2];
		mere=lst_family[id][3];
		if(pere==idInd)
		{
			ulDescendantCount++;
			if(ulDescendantCount<100)
			{
				GetDescendantCount(id);
			}
		}
		if(mere==idInd)
		{
			ulDescendantCount++;
			if(ulDescendantCount<100)
			{
				GetDescendantCount(id);
			}
		}
	}
}

function EstUnHomme(FatherId)
{
	for(var i= 0; i < lst_family.length; i++)
	{
		pere=lst_family[i][2];
		if(pere==FatherId)
		{
			return true;
		}
	}
	return false;
}

function ConjointPossedeParents(FatherId)
{
	idConjoint=DonneConjoint(FatherId);
	if(idConjoint.length==0)
	{
		return false;
	}
	for(var id= 0; id < lst_family.length; id++)
	{
		nom=lst_family[id][0];
		pere=lst_family[id][2];
		mere=lst_family[id][3];
		if(id==idConjoint)
		{
			if(pere==null && mere==null)
			{
				return false;
			}
			if(pere!=null || mere!=null)
			{
				return true;
			}
		}
	}
	return false;
}

function DonneConjoint(FatherId)
{
	var pere;
	var mere;
	var iCptConjoint;
	var conjoint=[];
	
	iCptConjoint=0;
	for(var i= 0; i < lst_family.length; i++)
	{
		pere=lst_family[i][2];
		mere=lst_family[i][3];
		if(pere==FatherId)
		{
			if(conjoint.includes(mere)==false && mere!=undefined)
			{
				conjoint[iCptConjoint++]=mere;
			}
		}
		if(mere==FatherId)
		{
			if(conjoint.includes(pere)==false && pere!=undefined)
			{
				conjoint[iCptConjoint++]=pere;
			}
		}
	}
	return conjoint;
}

function DonneInfoConjoint(idConjoint, conjoint)
{
	conjoint.ind=idConjoint[0];
	conjoint.nom=lst_family[idConjoint][0];
	conjoint.prenom=lst_family[idConjoint][1];
}

function DonneListeInfoConjoints(FatherId, conjoint)
{
	var idConjoint;
	
	idConjoint=DonneConjoint(FatherId);
	if(idConjoint.length==0)
	{
		return false;
	}
	conjoint.ind=idConjoint[0];
	conjoint.nom=lst_family[idConjoint[0]][0];
	conjoint.prenom=lst_family[idConjoint[0]][1];
	return true;
}

function GetBirthDate(IndId, objDate)
{
	objDate.year=lst_birth[IndId][0];
	objDate.month=lst_birth[IndId][1];
	objDate.day=lst_birth[IndId][2];
	objDate.place=lst_birth[IndId][4];
	if(objDate.year==null)
	{
		return false;
	}
	return true;
}

function GetDeathDate(IndId, objDate)
{
	objDate.year=lst_death[IndId][0];
	objDate.month=lst_death[IndId][1];
	objDate.day=lst_death[IndId][2];
	objDate.place=lst_death[IndId][4];
	if(objDate.year==null)
	{
		return false;
	}
	return true;
}

function GetPicture(IndId)
{
	for(var i= 0; i < lst_images.length; i++)
	{
		if(lst_images[i][0]==IndId)
		{
			return lst_images[i][1];
		}
	}
	return "";
}

function GetName(IndId)
{
	if(IndId==null)
	{
		return "?";
	}
	else
	{
		return lst_names[IndId];
	}
}

function GetPlace(PlaceId)
{
	if(PlaceId==null)
	{
		return "?";
	}
	else
	{
		return lst_places[PlaceId];
	}
}

function GetDate(objDate)
{
	var sDate="";

	if(objDate.day!=null)
	{
		sDate+=objDate.day;
	}
	else
	{
		sDate+="?";
	}
	if(objDate.month!=null)
	{
		sDate+="/"+(objDate.month+1);
	}
	else
	{
		sDate+="/?";
	}
	if(objDate.year!=null)
	{
		sDate+="/"+objDate.year;
	}
	else
	{
		sDate+="/?";
	}
	return sDate;
}

function GetFamEvents(IndId, objDate, IndConjoint)
{
	for(var i= 0; i < lst_event_indi_fam.length; i++)
	{
		if((lst_event_indi_fam[i][0]==IndId && lst_event_indi_fam[i][5]==IndConjoint)
			|| (lst_event_indi_fam[i][5]==IndId && lst_event_indi_fam[i][0]==IndConjoint))
		{
			objDate.year=lst_event_indi_fam[i][1];
			objDate.month=lst_event_indi_fam[i][2];
			objDate.day=lst_event_indi_fam[i][3];
			objDate.place=lst_event_indi_fam[i][6];
			objDate.type=lst_event_indi_fam[i][4];
			return true;
		}
	}
	return false;
}

function GetSentence(idSentence)
{
	return lst_event_types[idSentence];
}

function ShowEvents(IndId)
{
	var objEvent = { year : 1, month:1, day:1, place:1,type:""};
	var sIndEventInfo="";

	for(var i= 0; i < lst_event_indi.length; i++)
	{
		if(lst_event_indi[i][0]==IndId)
		{
			objEvent.year=lst_event_indi[i][1];
			objEvent.month=lst_event_indi[i][2];
			objEvent.day=lst_event_indi[i][3];
			objEvent.type=lst_event_indi[i][4];
			objEvent.place=lst_event_indi[i][5];
			sIndEventInfo=sIndEventInfo+GetSentence(objEvent.type)+" "+GetDate(objEvent)+" - "+GetPlace(objEvent.place)+"<br>";
		}
	}
	return sIndEventInfo;
}

function ShowNotes(IndId)
{
	var sIndEventInfo="";

	for(var i= 0; i < list_sources.length; i++)
	{
		if(list_sources[i][4]==IndId)
		{
			sIndEventInfo=sIndEventInfo+list_sources[i][0]+"<br>";
		}
	}
	return sIndEventInfo;
}

function ShowIndInfo(IndId)
{
	var conjoint = { ind : "0", nom : "1", prenom : "2"};	
	var sIndInfo="";
	var sPicture="";
	var idConjoint;
	var objDate = { year : 1, month:1, day:1, place:1,type:""};
	
	sPicture=GetPicture(IndId);
	sIndInfo=sIndInfo+"<center><table width=90% cellspacing=0 border=0><tr><td bgcolor=#dddddd width=35% valign=top><b><center>"+GetName(lst_family[IndId][0]) + " " + lst_first_names[lst_family[IndId][1]]+"</b></center>";
	if(sPicture!="")
	{
		sIndInfo=sIndInfo+"<table><tr><td><img src='"+sPicture+"' width=100></td><td valign=top>";
	}
//	sIndInfo=sIndInfo+"["+IndId+"]<br>";
	
	if(GetBirthDate(IndId, objDate)==true)
	{
		sIndInfo=sIndInfo+GetSentence(id_lbl_birth)+" : "+GetDate(objDate)+" - " + GetPlace(objDate.place) + "<br>";
	}
	if(GetDeathDate(IndId, objDate)==true)
	{
		sIndInfo=sIndInfo+GetSentence(id_lbl_death)+" : "+GetDate(objDate)+" - " + GetPlace(objDate.place) + "<br>";
	}
	sIndInfo=sIndInfo+ShowEvents(IndId);
	sIndInfo=sIndInfo+ShowNotes(IndId);	
	sIndInfo=sIndInfo+"&nbsp;";
	if(sPicture!="")
	{
		sIndInfo=sIndInfo+"</td></tr></table>";
	}

	lstIdConjoint=DonneConjoint(IndId)
	if(lstIdConjoint.length!=0)
	{
		var infoConjoint = { ind : "0", nom : "1", prenom : "2"};	
		
		for(iCptConjoint=0;iCptConjoint<lstIdConjoint.length;iCptConjoint++)
		{
			DonneInfoConjoint(lstIdConjoint[iCptConjoint], infoConjoint)

			sPicture=GetPicture(infoConjoint.ind);
			sIndInfo=sIndInfo+"</td>";
			if(GetFamEvents(lstIdConjoint[iCptConjoint], objDate, IndId)==true)
			{
				sIndInfo=sIndInfo+"<td>&nbsp;</td><td width=25% bgcolor=#dddddd valign=top>"+GetSentence(objDate.type)+" : "+GetDate(objDate)+" - " + GetPlace(objDate.place) + "<br></td>";
			}
			else
			{
				sIndInfo=sIndInfo+"<td>&nbsp;</td><td width=25%>&nbsp;<br></td>";
			}
			sIndInfo=sIndInfo+"<td>&nbsp;</td>";
			sIndInfo=sIndInfo+"<td width=35% bgcolor=#dddddd valign=top><center>";
			sIndInfo=sIndInfo+"<b>"+GetName(infoConjoint.nom) + " " + lst_first_names[infoConjoint.prenom]+"</b></center>";
			if(sPicture!="")
			{
				sIndInfo=sIndInfo+"<table><tr><td><img src='"+sPicture+"' width=100></td><td valign=top>";
			}
			if(GetBirthDate(lstIdConjoint[iCptConjoint], objDate)==true)
			{
				sIndInfo=sIndInfo+GetSentence(id_lbl_birth)+" : "+GetDate(objDate)+" - " + GetPlace(objDate.place) + "<br>";
			}
			if(GetDeathDate(lstIdConjoint[iCptConjoint], objDate)==true)
			{
				sIndInfo=sIndInfo+GetSentence(id_lbl_death)+" : "+GetDate(objDate)+" - " + GetPlace(objDate.place) + "<br>";
			}
			sIndInfo=sIndInfo+ShowEvents(lstIdConjoint[iCptConjoint]);
			sIndInfo=sIndInfo+ShowNotes(lstIdConjoint[iCptConjoint]);	
			sIndInfo=sIndInfo+"&nbsp;<tr><td>&nbsp;<tr><td>";
		}
	}
	else
	{
		sIndInfo=sIndInfo+"</td><td width=30%>&nbsp;</td><td>";
	}
	document.getElementById('IndInfo').innerHTML=sIndInfo+"</td></tr></table></center>";
}
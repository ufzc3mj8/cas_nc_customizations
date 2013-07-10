function ExitMapCode(variname){
	var currentValue = variname.substring(1,variname.length-1);
	~[tlist_sql;SELECT com_code.code code,
		com_code.description description,
		com_code.ps_group ps_group	
	FROM
		ps_common_code com_code
	WHERE
		ps_group='NC' AND
		category='exitcode'
	ORDER BY
		sortOrder,description;]
	document.write("<option value='~(code;t)' ");
	if (currentValue == '~(code;t)') {
		document.write(" SELECTED >");
	} else {
		document.write(" >");
	}
	document.write("~(description;t) (~(code;t))</option>");
		[/tlist_sql]	
}
function ExitMapCodeRE(variname){
	var currentValue = variname.substring(1,variname.length-1);
	~[tlist_sql;SELECT com_code.code code,
		com_code.description description
	FROM
		ps_common_code com_code
	WHERE
		ps_group='NC' AND
		category='exitcode';]
	if (currentValue == '~(code;t)') {
		document.write("~(description;t)");
	}
	[/tlist_sql]
}

function EntryMapCode(variname){
	var currentValue = variname.substring(1,variname.length-1);
	~[tlist_sql;SELECT com_code.code code,
		com_code.description description,
		com_code.ps_group ps_group	
	FROM
		ps_common_code com_code
	WHERE
		ps_group='NC' AND
		category='entrycode'
	ORDER BY
		sortOrder,description;]
	document.write("<option value='~(code;t)' ");
	if (currentValue == '~(code;t)') {
		document.write(" SELECTED >");
	} else {
		document.write(" >");
	}
	document.write("~(description;t) (~(code;t))</option>");
		[/tlist_sql]	
}
function EntryMapCodeRE(variname){
	var currentValue = variname.substring(1,variname.length-1);
	~[tlist_sql;SELECT com_code.code code,
		com_code.description description
	FROM
		ps_common_code com_code
	WHERE
		ps_group='NC' AND
		category='entrycode';]
	if (currentValue == '~(code;t)') {
		document.write("~(description;t)");
	}
	[/tlist_sql]
}


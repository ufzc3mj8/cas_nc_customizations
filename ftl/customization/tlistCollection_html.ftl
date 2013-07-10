<#assign allowEdits><@pss.legacy>~[if.modaccess]1[else]0[/if]</@pss.legacy></#assign>
<#assign dateFormat><@pss.getDateFormat content="mmddyyyy"/></#assign>
<div class="tlistCollectionTable">
	<table class="linkDescList" ID="tlistTable">
	<colgroup>
		<#list fields as field>
		<col class="col-${field}"></col>
		</#list>
		<#if allowEdits=="1">
		<col class="col-delete"></col>
		</#if>
	</colgroup>
	<thead>
		<tr>
			<#list fieldnames as name>
			<th>${name}</th>
			</#list>
			<#if allowEdits=="1">
			<th><@s.text name="psx.ftl.admin_customization.tlistCollection_html.delete" /></th>
			</#if>
		</tr>
	</thead>
	<tbody>
		
		<#if isStandAlone> 
		<#assign coreDcid = 0>
		<#else>
		<#assign coreDcid = values.coreDcid?c>
		</#if>
		
		<#if values?? && values.rows??>
		<#list values.rows as row>
		<tr>
			<#list 0..numFields-1 as i>
			<#assign hasField = false>
			<#if row.fields[i]??>
				<#assign hasField = true>
				<#assign field = row.fields[i]>
			</#if>
			<#assign fieldName = displayCols[i]>
			<#assign rowspec = coreTableName + ":" + coreDcid + "." + extensionName + "." + childTableName + ":" + row.id?c>
			<#assign htmlFieldName = "[" + rowspec + "]" + fieldName >
			<#assign tdspec = "<TD ID="+fieldName +">">
			<#if fieldtypes[i] = "String" || fieldtypes[i] = "Integer" || fieldtypes[i] = "Double">
				<#if fieldtypes[i] = "Integer" || fieldtypes[i] = "Double">
					<#assign validationClass = "psNumWidget">
				<#else>
					<#assign validationClass = "psTextWidget">
				</#if>
				${tdspec}<input type="text" class="${fields[i]} ${validationClass}<#if fieldreadonly[i] = false && fieldrequired[i] = true> required</#if>"<#if hasField> value="${field.newValue?html!""}"</#if><#if fieldreadonly[i] = true> readonly="readonly"</#if><#if (fieldmaxlength[i] > 0)> maxlength="${fieldmaxlength[i]?c}"</#if> name="${htmlFieldName}" /></td>
			<#elseif fieldtypes[i] = "Clob" || fieldtypes[i] = "Blob">
				<td><textarea class="${fields[i]}<#if fieldreadonly[i] = false && fieldrequired[i] = true> required</#if>" <#if fieldreadonly[i] = true>readonly="readonly"</#if> name="${htmlFieldName}"><#if hasField>${field.newValue?html!""}</#if></textarea></td>
			<#elseif fieldtypes[i] = "Date">
				<td><input type="text" class="${fields[i]}<#if fieldreadonly[i] = false && fieldrequired[i] = true> required</#if><#if fieldreadonly[i] = true>" readonly="readonly<#else> psDateWidget</#if>"<#if hasField> value="${field.newValue?string(dateFormat)!""}"</#if> name="${htmlFieldName}" /></td>
			<#elseif fieldtypes[i] = "Boolean">
				<#assign checked><#if hasField && field.newValue?? && field.newValue>checked="checked"<#else></#if></#assign>
				<#assign disabled><#if fieldreadonly[i] = true> disabled="disabled"<#else></#if></#assign>
				<td><input type="checkbox" class="${fields[i]}" ${disabled} ${checked} name="${htmlFieldName}" /></td>
			</#if>
			</#list>
			<#if allowEdits=="1">
			<td><input class="deleteCB" name="DC-${rowspec}" type="checkbox" /></td>
			</#if>
		</tr>
		</#list>
		</#if>
		
		<#if allowEdits=="1">
		<tr class="new">
			<#list 0..numFields-1 as i>
			<#assign fieldName = displayCols[i]>
			<#assign rowspec = coreTableName + ":" + coreDcid + "." + extensionName + "." + childTableName + ":-<INSERT_COUNTER>">
			<#-- Note that we need to add the CF- for the new fields -->
			<#assign htmlFieldName = "CF-[" + rowspec + "]" + fieldName >
			<#if fieldreadonly[i] = true>
				<#if fieldtypes[i] = "Boolean">
					<td><input type="checkbox" disabled="disabled"<#if fielddefaults[i]?? && fielddefaults[i] = true> checked="checked"</#if> /></td>
				<#elseif fieldtypes[i] = "Clob" || fieldtypes[i] = "Blob">
					<td><textarea class="${fields[i]}" readonly="readonly"></textarea></td>
				<#else>
					<td><input class="${fields[i]}" readonly="readonly" /></td>
				</#if>
			<#elseif fieldtypes[i] = "String" || fieldtypes[i] = "Integer" || fieldtypes[i] = "Double">
				<#if fieldtypes[i] = "Integer" || fieldtypes[i] = "Double">
					<#assign validationClass = "psNumWidget">	
				<#else>
					<#assign validationClass = "psTextWidget">
				</#if>
				<td><input type="text" class="${fields[i]}" data-addclass="${validationClass}<#if fieldrequired[i] = true> required</#if>"<#if (fieldmaxlength[i] > 0)> maxlength="${fieldmaxlength[i]?c}"</#if> value="${fielddefaults[i]!""}" data-name="${htmlFieldName}" /></td>
			<#elseif fieldtypes[i] = "Clob" || fieldtypes[i] = "Blob">
				<td><textarea class="${fields[i]}" data-name="${htmlFieldName}<#if fieldrequired[i] = true> required</#if>">${fielddefaults[i]!""}</textarea></td>
			<#elseif fieldtypes[i] = "Date">
				<td><input type="text" class="${fields[i]}" data-addclass="psDateWidget<#if fieldrequired[i] = true> required</#if>" value="${fielddefaults[i]!""}" data-name="${htmlFieldName}" /></td>
			<#elseif fieldtypes[i] = "Boolean">
				<td><input type="checkbox" class="${fields[i]}"<#if fielddefaults[i]?? && fielddefaults[i] = true> checked="checked"</#if> data-name="${htmlFieldName}" /></td>
			</#if>
			</#list>
			<td class="deleteCol"></td>
		</tr>
		</#if>
	</tbody>
	</table>
</div>

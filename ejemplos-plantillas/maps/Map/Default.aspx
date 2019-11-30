<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Google Map</title>

    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>

    <script src="Scripts/jquery-1.9.1.min.js" type="text/javascript"></script>

    <script src="Scripts/googlemap.js" type="text/javascript"></script>

    <script src="Scripts/jquery.tablednd.js" type="text/javascript"></script>

</head>
<body>
    <form id="form1" runat="server">
    <div id="dvMap" style="height: 600px; width: 80%;">
    </div>

    <script type="text/javascript" language="javascript">
        InitializeMap();
    </script>

    </form>
</body>
</html>

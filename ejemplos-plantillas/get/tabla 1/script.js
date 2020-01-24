$(document).ready(function() {
  //
  //  DATA TABLE
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  $(".data-table").each(function(i, e) {
    $table = $(this);

    var style_string = buildDOMString();

    $table.DataTable({
      // pageLength: 10,
      dom: style_string,

      initComplete: function() {
        // Get table data as an array.
        var tableData = getTableData(this);

        // Add filters to the table.
        handleDataTableFilters(this, tableData);

        // Add buttons to the table (if applicable).
        handleDataTableButtons(this);
      }
    });
  });

  //
  //  HANDLE DATA TABLE BUTTONS
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function handleDataTableButtons(table) {
    // Declare variables.
    var buttonsTableId;
    var buttons;

    // Get the table node.
    var tableNode = table
      .api()
      .table()
      .node();

    // Instantiate table as jQuery object.
    var $table = $(tableNode);
    var tableId = $table.attr("id");

    // If the dataTableButtons variable exists (as declared on the page).
    if (typeof dataTableButtons != "undefined") {
      // Loop through dataTableButtons.
      // There will be a separate array item for each table on the page.
      for (var i = 0; i < dataTableButtons.length; i++) {
        // Get the ID of the current button.
        buttonsTableId = dataTableButtons[i].tableId;

        // If the buttonTableId matches the ID of the current table.
        if (buttonsTableId === tableId) {
          // console.log("The table matched: " + tableId);
          buttons = dataTableButtons[i].buttons;

          addDataTableButtons(buttonsTableId, buttons);
        }
      }

      // console.log(dataTableButtons);
    } else {
      // console.log("aint no buttons");
    }
  }

  function addDataTableButtons(tableId, buttons) {
    // Get the table as a jQuery object.
    var $table = $("#" + tableId);

    // Get the table wrapper.
    var $tableWrapper = $table.closest(".dataTables_wrapper");

    // Get the table button container for this table.
    var $tableButtonsContainer = $tableWrapper.find(".data-table-buttons");

    console.log($tableButtonsContainer);

    // Create buttons.
    new $.fn.dataTable.Buttons($table.DataTable(), {
      buttons: buttons
    });

    // Append buttons to the button container.
    $table
      .DataTable()
      .buttons()
      .container()
      .appendTo(
        $tableButtonsContainer,
        $table
          .DataTable()
          .table()
          .container()
      );
  }

  //
  //  GET TABLE DATA
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function getTableData(table) {
    var tableData = [];

    table
      .api()
      .columns()
      .every(function(rowIndex) {
        // This is all columns (left to right).
        // Each "columns" item contains all rows of column index X.
        var column = this;

        // Convert to a jQuery object.
        var $column = column.nodes().to$();
        // console.log( $column.attr('data-filterable') );
        // console.log( $columns.text() + ', ' );

        // Create a row array.
        var row = [];

        // Loop through the cells of each column.
        $column.each(function(colIndex) {
          // Instantiate current column.
          var $columnCell = $(this);
          // console.log( $column.text().trim() );

          // Create a new object with cell data.
          var col = {};
          var filterable = $columnCell.attr("data-filterable");

          if (filterable) {
            filterable = true;
          } else {
            filterable = false;
          }

          col.filterable = filterable;
          col.text = $columnCell.text().trim();
          col.value = $columnCell.attr("data-search");
          col.index = colIndex;
          row.push(col);
        });

        tableData.push(row);
      });

    return tableData;
  }

  //
  //  HANDLE DATA TABLE FILTERS
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function handleDataTableFilters(table, tableData) {
    table
      .api()
      .columns()
      .every(function(colIndex) {
        // Declare an empty array for unique column data.
        var uniqueColumnData;

        // Get the current column.
        var column = this;

        // Get the current column's header.
        var columnHeader = column.header();

        // Get the current column's header as a jQuery object.
        var $columnHeader = $(columnHeader);
        // console.log( $columnHeader.attr('data-col-name') );

        var filterable = $columnHeader.attr("data-filterable");

        // If the column requires filtering.
        if (filterable) {
          // Array to store all column cell data.
          var columnCellDataArr = [];
          var columnCell;
          var columnCellValue;

          // Disable filtering clicks on this header.
          // $columnHeader.unbind("click.DT");

          // Get the data for the current column.
          var currentColumn = tableData[colIndex];

          // Loop through column cells for the relevant comment.
          for (var i = 0; i < currentColumn.length; i++) {
            // Instantiate current column cell.
            columnCell = currentColumn[i];

            // Get current column cell value.
            columnCellValue = columnCell.value;

            // Push the column cell value to an array.
            columnCellDataArr.push(columnCellValue);
          }

          // console.log(columnCellDataArr);

          // Filter unique values for this column.
          uniqueColumnData = columnCellDataArr.filter(onlyUnique);

          // If there's unique column data.
          if (uniqueColumnData) {
            // Alphabetically sort column filters.

            var uniqueColumnData = uniqueColumnData.sort(function(a, b) {
              if (a < b) return -1;
              else if (a > b) return 1;
              return 0;
            });

            var filterDropdownHTML = buildFilterDropdown(
              $columnHeader,
              uniqueColumnData,
              colIndex
            );

            // Add class to the column header.
            $columnHeader.addClass("table-filter");

            // Update the HTML.
            $columnHeader.html(filterDropdownHTML);
          }
        } // if (filterable)
      }); // .every(function(colIndex)
  }

  var table = $(".data-table-TEST").DataTable({
    pageLength: 25,
    initComplete: function() {
      console.log("––––––––––––––––––––––––––––––––––––");

      var tableData = [];

      //
      //  GATHER TABLE DATA
      //––––––––––––––––––––––––––––––––––––––––––––––––––

      this.api()
        .columns()
        .every(function(rowIndex) {
          // This is all columns (left to right).
          // Each "columns" item contains all rows of column index X.
          var column = this;

          // Convert to a jQuery object.
          var $column = column.nodes().to$();
          // console.log( $column.attr('data-filterable') );
          // console.log( $columns.text() + ', ' );

          // Create a row array.
          var row = [];

          // Loop through the cells of each column.
          $column.each(function(colIndex) {
            // Instantiate current column.
            var $columnCell = $(this);
            // console.log( $column.text().trim() );

            // Create a new object with cell data.
            var col = {};
            var filterable = $columnCell.attr("data-filterable");

            if (filterable) {
              filterable = true;
            } else {
              filterable = false;
            }

            col.filterable = filterable;
            col.text = $columnCell.text().trim();
            col.value = $columnCell.attr("data-col-value");
            col.index = colIndex;
            row.push(col);
          });

          tableData.push(row);
        });

      // console.log(tableData);

      //
      //  HANDLE FILTERS
      //––––––––––––––––––––––––––––––––––––––––––––––––––

      this.api()
        .columns()
        .every(function(colIndex) {
          // Declare an empty array for unique column data.
          var uniqueColumnData;

          // Get the current column.
          var column = this;

          // Get the current column's header.
          var columnHeader = column.header();

          // Get the current column's header as a jQuery object.
          var $columnHeader = $(columnHeader);
          // console.log( $columnHeader.attr('data-col-name') );

          var filterable = $columnHeader.attr("data-filterable");

          // If the column requires filtering.
          if (filterable) {
            // Array to store all column cell data.
            var columnCellDataArr = [];
            var columnCell;
            var columnCellValue;

            // Disable filtering clicks on this header.
            // $columnHeader.unbind("click.DT");

            // Get the data for the current column.
            var currentColumn = tableData[colIndex];

            // Loop through column cells for the relevant comment.
            for (var i = 0; i < currentColumn.length; i++) {
              // Instantiate current column cell.
              columnCell = currentColumn[i];

              // Get current column cell value.
              columnCellValue = columnCell.text;

              // Push the column cell value to an array.
              columnCellDataArr.push(columnCellValue);
            }

            // console.log(columnCellDataArr);

            // Filter unique values for this column.
            uniqueColumnData = columnCellDataArr.filter(onlyUnique);

            // If there's unique column data.
            if (uniqueColumnData) {
              // Alphabetically sort column filters.

              var uniqueColumnData = uniqueColumnData.sort(function(a, b) {
                if (a < b) return -1;
                else if (a > b) return 1;
                return 0;
              });

              var filterDropdownHTML = buildFilterDropdown(
                $columnHeader,
                uniqueColumnData,
                colIndex
              );

              // Add class to the column header.
              $columnHeader.addClass("table-filter");

              // Update the HTML.
              $columnHeader.html(filterDropdownHTML);
            }
          } // if (filterable)
        }); // .every(function(colIndex)
    }
  });

  //
  //  DISABLE EVENT PROPAGATION ON CHILD LIs
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  $(".table-filter__dropdown li").click(function(e) {
    e.stopPropagation();
  });

  //
  //  FILTER TOGGLE ALL / NONE
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  $(".table-filter__filter-toggle").click(function(e) {
    // Get the toggle type.
    var toggleType = $(this).attr("data-toggle-type");
    var isChecked;
    var columnIndex;

    // Get parent dropdown.
    var $dropdown = $(this).closest(".table-filter__dropdown");
    var $checkboxes = $dropdown.find(".table-filter__filter-checkbox");

    // If this is the select all toggle.
    if (toggleType === "all") {
      isChecked = true;

      // If this is the select none toggle.
    } else if (toggleType === "none") {
      isChecked = false;
    }

    $checkboxes.each(function(i, e) {
      // Get the current checkbox.
      var $checkbox = $(this);

      // Get the checked status of the checkbox.
      $checkbox.prop("checked", isChecked);

      columnIndex = $checkbox.attr("data-column-index");
    });

    // Update column filters.
    updateColumnFilters($dropdown, columnIndex);
  });

  //
  //  HANDLE CHECKBOXES CHANGING
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  $(".table-filter__filter-checkbox").on("change", function(e) {
    // Get parent dropdown.
    var $dropdown = $(this).closest(".table-filter__dropdown");

    // Get the column index.
    var columnIndex = $(this).attr("data-column-index");

    // Update column filters.
    updateColumnFilters($dropdown, columnIndex);
  });

  //
  //  UPDATE COLUMN FILTERS
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function updateColumnFilters($dropdown, columnIndex) {
    // Get all checkboxes in the filter dropdown.
    var $checkboxes = $dropdown.find(".table-filter__filter-checkbox");
    var $parentTable = $dropdown.closest(".data-table");

    // Declare an empty array to store selected filters.
    var selectedFilters = [];

    // Loop through checkboxes to find selected filters.
    $checkboxes.each(function(i, e) {
      // Get the current checkbox.
      var $checkbox = $(this);

      // Get the checked status of the checkbox.
      var isChecked = $checkbox.prop("checked");

      // If the checkbox is checked.
      if (isChecked) {
        // Get the filter value from the checkbox.
        var checkboxValue = $checkbox.attr("data-column-value");

        // Push the current filter to the selectedFilters array.
        selectedFilters.push(checkboxValue);
      }
    });

    // Add the filter count to the filter counter.
    // Get the parent <th>
    var $th = $dropdown.closest(".table-filter");

    // Get the counter element.
    var $counter = $th.find(".table-filter__counter");

    // Update the counter value with the number of selectors.
    $counter.text("(" + selectedFilters.length + ")");

    // Generate filter regex string.
    filterRegexString = generateFilterRegexString(selectedFilters);

    // Apply filters
    $parentTable
      .DataTable()
      .columns(columnIndex)
      .search(filterRegexString, true)
      // .search("(" + filterText + ")", true)
      // .search("(Developer)|(Accountant)", true)
      // .search("(Accountant)", true)
      .draw();
  }
});

//
//  GENERATE FILTER REGEX
//––––––––––––––––––––––––––––––––––––––––––––––––––

function generateFilterRegexString(selectedFilters) {
  // Declare an empty string to add regex string.
  var filterRegexString = "";
  var selectedFilter;

  // Loop through selected filters.
  for (var i = 0; i < selectedFilters.length; i++) {
    selectedFilter = selectedFilters[i];

    // Look for the selected string without a space before (\s) or after it.
    // This is set up to work even if selectedFilter has spaces.
    filterRegexString += "((?<!\\s)" + selectedFilter + "(?!\\s))";

    // If this isn't the last item, add a | to the string (allows searching multiple).
    if (i != selectedFilters.length - 1) {
      filterRegexString += "|";
    }
  }

  // If there's no regex string.
  if (!filterRegexString) {
    // Search for blank (i.e. show no records).
    filterRegexString = "^$";
  }

  return filterRegexString;
}

//
//  BUILD FILTER DROPDOWN
//––––––––––––––––––––––––––––––––––––––––––––––––––

function buildFilterDropdown($columnHeader, uniqueColumnData, colIndex) {
  // Get column header text.
  var columnHeaderText = $columnHeader.text().trim();
  var columnData;

  // Build dropdown.
  var dropdownHTML = "";
  dropdownHTML += '<a href="javascript:void(0);" class="table-filter__link">';
  dropdownHTML +=
    columnHeaderText + ' <span class="table-filter__counter"></span>';
  dropdownHTML += "</a>";
  dropdownHTML += '<ul class="table-filter__dropdown">';

  dropdownHTML += '<li class="table-filter__dropdown-title">';
  dropdownHTML += "Filters";
  dropdownHTML +=
    '<a href="javascript:void(0);" class="table-filter__filter-toggle table-filter__filter-toggle--all" data-toggle-type="all">All</a>';
  dropdownHTML +=
    '<a href="javascript:void(0);" class="table-filter__filter-toggle table-filter__filter-toggle--none" data-toggle-type="none">None</a>';
  dropdownHTML += "</li>";

  // Loop through unique column data.
  for (var i = 0; i < uniqueColumnData.length; i++) {
    columnData = uniqueColumnData[i];
    dropdownHTML += '<li class="table-filter__dropdown-item">';
    dropdownHTML +=
      '<label class="table-filter__filter-label" data-column-index="' +
      colIndex +
      '">';
    dropdownHTML +=
      '<input class="table-filter__filter-checkbox" type="checkbox" checked data-column-value="' +
      columnData +
      '" data-column-index="' +
      colIndex +
      '" />';
    dropdownHTML += columnData;
    dropdownHTML += "</label>";
    dropdownHTML += "</li>";
  }

  dropdownHTML += "</ul>";

  return dropdownHTML;
}

//
//  BUILD DATA TABLE DOM STRING
//––––––––––––––––––––––––––––––––––––––––––––––––––

function buildDOMString() {
  var style_string = "";
  // Above the table.
  style_string += "<'row'";
  style_string += "<'col-sm-3 col-xl-2'l>";
  // style_string += "<'col-sm-2'B>";
  style_string += "<'col-sm-3 col-xl-2 data-table-buttons'>";
  style_string += "<'col-sm-6 col-xl-8'f>";
  style_string += ">";
  // The table.
  style_string += "<'row'";
  style_string += "<'col-sm-12'tr>";
  style_string += ">";
  // Below the table.
  style_string += "<'row'";
  style_string += "<'col-sm-5'i><'col-sm-7'p>";
  style_string += ">";

  return style_string;
}

//
//  ONLY UNIQUE
//––––––––––––––––––––––––––––––––––––––––––––––––––

// Used to find unique elements in an array.
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
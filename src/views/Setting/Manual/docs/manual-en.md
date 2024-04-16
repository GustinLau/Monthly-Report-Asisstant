<h1 style='text-align: center'>Monthly Report Assistant Operation Manual</h1> 

## Exporting Data Document

1. Query the data needed to generate the document.

// Query condition image

2. Set export columns.

// Export column image

3. Export data.

// Export data button image

## Configuring Projects

Before using, you need to configure the project. Click on the bottom left <carbon-settings></carbon-settings> button, select the `System Setting` menu to enter the settings page.

<document-image name="setting"></document-image>

Click on the right side of the project configuration <carbon-arrow-right></carbon-arrow-right> to enter the project configuration page.

<document-image name="project-config"></document-image>

Click on the top right <el-button size="small" type="success">Add</el-button> to open the add project popup and add the project.

<document-image name="create-project"></document-image>

After filling in the relevant project information, click <el-button size="small" type="primary">Confirm</el-button>.

<document-image name="project-list"></document-image>

After adding, the project will be displayed in the project list.

If you need to edit or delete a project, click on the right side <el-button link type="primary" size="small">Edit</el-button> or <el-button link type="danger" size="small">Delete</el-button> respectively.

## Data Processing

Click on the project information box on the program homepage.

<p style="user-select: none">
    <el-alert type="error" :closable='false'>
        <carbon-close-filled style="color: var(--el-color-error)"></carbon-close-filled>
        <span style='margin-left: 8px'>Project not configured</span>
    </el-alert>
    <span style="padding: 0 4px">or</span>
    <el-alert type="success" :closable='false'>
        <carbon-checkmark-filled style="color: var(--el-color-success)"></carbon-checkmark-filled>
        <span style='margin-left: 8px'>XXX Project</span>
    </el-alert>
</p>

A project selection box will pop up after that, where you can choose the configured project.

<document-image name="project-select"></document-image>

After selecting, click or drag the data document to the upload box to process the related project data.
 <div class='upload-container'>
    <el-upload drag :disabled='true' :show-file-list='false'>
        <carbon-cloud-upload style='font-size: 64px;color: var(--el-color-primary)'></carbon-cloud-upload>
        <div class='el-upload__text'>
            Drop file here or click to upload
        </div>
        <div class='el-upload__text_sub'>
            Only support csv files
        </div>
    </el-upload>
</div>

After the data processing is completed, you will enter the data review page.

<document-image name="review"></document-image>

After confirming the correctness, click on the right side <el-button size="small" type="primary">Export</el-button> button to export the monthly report data.

<document-image name="export-success"></document-image>

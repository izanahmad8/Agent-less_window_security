import platform
import subprocess
import wmi
import os
import re
 
def get_os_details():
    os_details = {}
    
    os_details['OS'] = platform.system()
    os_details['Version'] = platform.version()
    os_details['Release'] = platform.release()
    os_details['Platform Version'] = platform.platform()
    os_details['Machine'] = platform.machine()
    os_details['Processor'] = platform.processor()

    if os_details['OS'] == 'Windows':
        try:
            os_details['Build'] = subprocess.check_output(['wmic', 'os', 'get', 'BuildNumber'], shell=True).decode().split()[1]
        except Exception as e:
            os_details['Build'] = f"Error retrieving build number: {str(e)}"
    
    return os_details

def get_installed_hotfixes():
    hotfixes = []
    
    c = wmi.WMI()
    for hotfix in c.Win32_QuickFixEngineering():
        hotfixes.append({
            'HotFixID': hotfix.HotFixID,
            'Description': hotfix.Description,
            'InstalledOn': hotfix.InstalledOn
        })
    
    return hotfixes

def get_dotnet_versions():
    net_versions = []
    registry_path = r"HKLM\SOFTWARE\Microsoft\NET Framework Setup\NDP"

    try:
        output = subprocess.check_output(['reg', 'query', registry_path, '/s', '/f', 'Version', '/t', 'REG_SZ'], shell=True).decode()
        version_dict = {}
        lines = output.splitlines()

        for line in lines:
            if "Version" in line:
                parts = line.split()
                if len(parts) > 1:
                    version = parts[-1]
                    key = re.sub(r"\\[^\\]+$", "", line).strip()
                    if key in version_dict:
                        version_dict[key].add(version)
                    else:
                        version_dict[key] = {version}
        
        for key, versions in version_dict.items():
            formatted_versions = ', '.join(sorted(versions))
            net_versions.append(f"{key}: {formatted_versions}")

    except subprocess.CalledProcessError as e:
        net_versions.append(f"Error retrieving .NET versions: {str(e)}")
    except Exception as e:
        net_versions.append(f"Unexpected error: {str(e)}")
    
    return net_versions

def get_amsi_providers():
    amsi_providers = []
    command = r'wmic /namespace:\\root\SecurityCenter2 path AntiVirusProduct get displayName'

    try:
        result = subprocess.run(command, capture_output=True, text=True, shell=True)
        if result.returncode != 0:
            print("Command failed with error:", result.stderr)
            return []
        
        output = result.stdout.strip()
        lines = output.splitlines()
        for line in lines[1:]:
            provider_name = line.strip()
            if provider_name:
                amsi_providers.append(provider_name)
    
    except Exception as e:
        amsi_providers.append(f"Error retrieving AMSI providers: {str(e)}")
    
    return amsi_providers

def get_audit_policy_settings():
    audit_policies = []
    registry_path = r"HKLM\Software\Microsoft\Windows\CurrentVersion\Policies\System"
    
    try:
        output = subprocess.check_output(['reg', 'query', registry_path, '/s'], shell=True).decode()
        lines = output.splitlines()
        
        for line in lines:
            if line.strip() and not line.startswith("HKEY"):
                audit_policies.append(line.strip())
    
    except subprocess.CalledProcessError as e:
        audit_policies.append(f"Error retrieving audit policies: {str(e)}")
    except Exception as e:
        audit_policies.append(f"Unexpected error: {str(e)}")
    
    return audit_policies

def get_autorun_entries():
    autorun_entries = []
    paths = [
        r"SOFTWARE\Microsoft\Windows\CurrentVersion\Run",
        r"SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Run"
    ]
    
    try:
        for path in paths:
            output = subprocess.check_output(['reg', 'query', f"HKLM\\{path}", '/s'], shell=True).decode()
            lines = output.splitlines()
            for i in range(len(lines)):
                if "REG_SZ" in lines[i]:
                    entry = lines[i].split("    ")
                    autorun_entries.append({
                        'Path': path,
                        'Name': entry[0].strip(),
                        'Executable': entry[-1].strip()
                    })
    except subprocess.CalledProcessError as e:
        autorun_entries.append(f"Error retrieving auto-run entries: {str(e)}")
    
    return autorun_entries

def get_startup_folder_entries():
    startup_entries = []
    paths = [
        os.path.join(os.getenv('APPDATA'), r"Microsoft\Windows\Start Menu\Programs\Startup"),
        os.path.join(os.getenv('PROGRAMDATA'), r"Microsoft\Windows\Start Menu\Programs\Startup")
    ]
    
    for path in paths:
        for root, dirs, files in os.walk(path):
            for file in files:
                startup_entries.append({
                    'Folder': path,
                    'File': file,
                    'Path': os.path.join(root, file)
                })
    
    return startup_entries

def generate_html_report():
    os_details = get_os_details()
    hotfixes = get_installed_hotfixes()
    net_versions = get_dotnet_versions()
    amsi_providers = get_amsi_providers()
    audit_policies = get_audit_policy_settings()
    autorun_entries = get_autorun_entries()
    startup_entries = get_startup_folder_entries()
    
    html_content = """
    <html>
    <head>
        <title>System Information Report</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 20px;
                padding: 0;
                background-color: #f0f0f0;
            }
            h1, h2 {
                color: #333;
            }
            .container {
                background-color: white;
                border-radius: 8px;
                padding: 20px;
                box-shadow: 0 0 15px rgba(255, 0, 0, 0.5);
            }
            .section {
                margin-bottom: 20px;
            }
            .section h2 {
                border-bottom: 2px solid #333;
                padding-bottom: 5px;
                margin-bottom: 15px;
            }
            ul {
                list-style-type: none;
                padding-left: 0;
            }
            li {
                background-color: #f9f9f9;
                margin: 5px 0;
                padding: 10px;
                border-radius: 4px;
                border: 1px solid #ddd;
            }
            a {
                color: #007BFF;
                text-decoration: none;
            }
            a:hover {
                text-decoration: underline;
            }
            .collapsible {
                background-color: #B22222;
                color: white;
                cursor: pointer;
                padding: 10px;
                width: 100%;
                border: none;
                text-align: left;
                outline: none;
                font-size: 16px;
                border-radius: 4px;
                margin-bottom: 10px;
            }
            .content {
                padding: 0 18px;
                display: none;
                overflow: hidden;
                background-color: #f1f1f1;
                margin-bottom: 10px;
                border-radius: 4px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>System Information Report</h1>
            <div class="section">
                <h2>Table of Contents</h2>
                <ul>
                    <li><a href="#os-details">OS Details</a></li>
                    <li><a href="#hotfixes">Installed Hotfixes</a></li>
                    <li><a href="#dotnet-versions">Installed .NET Versions</a></li>
                    <li><a href="#amsi-providers">AMSI Providers</a></li>
                    <li><a href="#audit-policies">Audit Policy Settings</a></li>
                    <li><a href="#autorun-entries">Registry Auto-Run Entries</a></li>
                    <li><a href="#startup-entries">Startup Folder Entries</a></li>
                </ul>
            </div>

            <div class="section" id="os-details">
                <button class="collapsible">OS Details</button>
                <div class="content">
                    <ul>
    """
    
    for key, value in os_details.items():
        html_content += f"<li>{key}: {value}</li>"
    
    html_content += """
                    </ul>
                </div>
            </div>

            <div class="section" id="hotfixes">
                <button class="collapsible">Installed Hotfixes</button>
                <div class="content">
                    <ul>
    """
    
    if hotfixes:
        for hotfix in hotfixes:
            html_content += f"<li>HotFixID: {hotfix['HotFixID']}, Description: {hotfix['Description']}, InstalledOn: {hotfix['InstalledOn']}</li>"
    else:
        html_content += "<li>No hotfixes installed or unable to retrieve hotfixes.</li>"
    
    html_content += """
                    </ul>
                </div>
            </div>

            <div class="section" id="dotnet-versions">
                <button class="collapsible">Installed .NET Versions</button>
                <div class="content">
                    <ul>
    """
    
    for version in net_versions:
        html_content += f"<li>{version}</li>"
    
    html_content += """
                    </ul>
                </div>
            </div>

            <div class="section" id="amsi-providers">
                <button class="collapsible">AMSI Providers</button>
                <div class="content">
                    <ul>
    """
    
    for provider in amsi_providers:
        html_content += f"<li>{provider}</li>"
    
    html_content += """
                    </ul>
                </div>
            </div>

            <div class="section" id="audit-policies">
                <button class="collapsible">Audit Policy Settings</button>
                <div class="content">
                    <ul>
    """
    
    for policy in audit_policies:
        html_content += f"<li>{policy}</li>"
    
    html_content += """
                    </ul>
                </div>
            </div>

            <div class="section" id="autorun-entries">
                <button class="collapsible">Registry Auto-Run Entries</button>
                <div class="content">
                    <ul>
    """
    
    if autorun_entries:
        for entry in autorun_entries:
            html_content += f"<li>Name: {entry['Name']}, Executable: {entry['Executable']}, Path: {entry['Path']}</li>"
    else:
        html_content += "<li>No auto-run entries found or unable to retrieve entries.</li>"
    
    html_content += """
                    </ul>
                </div>
            </div>

            <div class="section" id="startup-entries">
                <button class="collapsible">Startup Folder Entries</button>
                <div class="content">
                    <ul>
    """
    
    if startup_entries:
        for entry in startup_entries:
            html_content += f"<li>File: {entry['File']}, Path: {entry['Path']}</li>"
    else:
        html_content += "<li>No startup folder entries found or unable to retrieve entries.</li>"
    
    html_content += """
                    </ul>
                </div>
            </div>

        </div>
        <script>
            var coll = document.getElementsByClassName("collapsible");
            for (var i = 0; i < coll.length; i++) {
                coll[i].addEventListener("click", function() {
                    this.classList.toggle("active");
                    var content = this.nextElementSibling;
                    if (content.style.display === "block") {
                        content.style.display = "none";
                    } else {
                        content.style.display = "block";
                    }
                });
            }
        </script>
    </body>
    </html>
    """

    with open("system_report.html", "w") as report_file:
        report_file.write(html_content)
        print("HTML report generated successfully.")

if __name__ == "__main__":
    generate_html_report()
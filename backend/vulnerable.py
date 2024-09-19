import platform
import subprocess
import logging
import requests

# Configure logging
logging.basicConfig(filename='vulnerability_check.log', level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

# API endpoint for vulnerabilities and patches
API_URL = "https://api.msrc.microsoft.com/cvrf/v3.0/cvrf/{document_id}"

def fetch_vulnerabilities_from_api(document_id):
    """Fetch vulnerabilities from the API using a specific document ID."""
    url = API_URL.format(document_id=document_id)
    try:
        logging.debug(f"Attempting to fetch vulnerability information from: {url}")
        response = requests.get(url, timeout=10)  # Timeout of 10 seconds
        response.raise_for_status()  # Raise HTTPError for bad responses
        data = response.json()  # Parse response to JSON
        logging.debug(f"Vulnerabilities and patches data retrieved: {data}")

        if isinstance(data, dict):
            return data.get('vulnerabilities', [])
        else:
            logging.error("Unexpected data format received from the API.")
            return []
    except requests.exceptions.RequestException as e:
        logging.error(f"Error fetching vulnerabilities from the API: {e}")
        return []

def get_os_details():
    """Retrieve OS details of the system."""
    os_details = {}
    try:
        os_details['OS'] = platform.system()
        os_details['Version'] = platform.version()
        os_details['Release'] = platform.release()
        os_details['Platform Version'] = platform.platform()
        os_details['Machine'] = platform.machine()
        os_details['Processor'] = platform.processor()

        if os_details['OS'] == 'Windows':
            try:
                build_number = subprocess.check_output(['wmic', 'os', 'get', 'BuildNumber'], shell=True).decode().strip().split('\n')[-1]
                os_details['Build'] = f"10.0.{build_number}"  # Ensure the build number format
            except subprocess.CalledProcessError as e:
                os_details['Build'] = f"Error retrieving build number: {str(e)}"
                logging.error(f"Error retrieving build number: {str(e)}")

        if 'Windows 10' in os_details['Platform Version']:
            os_details['OS'] = 'Windows 10'
        elif 'Windows 11' in os_details['Platform Version']:
            os_details['OS'] = 'Windows 11'
    except Exception as e:
        logging.error(f"Error retrieving OS details: {e}")

    logging.debug(f"OS details: {os_details}")
    return os_details

def check_vulnerability(os_info, vulnerabilities):
    """Check if the system's OS is listed as vulnerable."""
    try:
        build_version = os_info.get('Build', '').strip()  # Full build version
        logging.debug(f"Checking vulnerability for OS = {os_info.get('OS')}, Build = {build_version}")

        if isinstance(vulnerabilities, dict):
            vulnerabilities = vulnerabilities.get('vulnerabilities', [])
        elif not isinstance(vulnerabilities, list):
            logging.error(f"Expected a list of vulnerabilities, got {type(vulnerabilities)}")
            return False

        for version in vulnerabilities:
            if isinstance(version, dict):
                if os_info.get('OS') == version.get('OS') and build_version == version.get('Version'):
                    logging.debug(f"Vulnerability detected: OS = {os_info.get('OS')}, Build = {build_version}")
                    return True

        logging.debug(f"No vulnerability detected: OS = {os_info.get('OS')}, Build = {build_version}")
        return False
    except Exception as e:
        logging.error(f"Error during vulnerability check: {e}")
        return False

def get_patch_info(os_info, vulnerabilities):
    """Retrieve patch information for a vulnerable system."""
    try:
        build_version = os_info.get('Build', '').split('10.0.')[-1]  # Extract relevant part of build version
        logging.debug(f"Fetching patch info for OS = {os_info.get('OS')}, Build = {build_version}")

        for version in vulnerabilities:
            if os_info.get('OS') == version.get('OS') and version.get('Version').split('10.0.')[-1] == build_version:
                patch = version.get('Patch', 'No patch information available')
                logging.debug(f"Patch info retrieved: {patch}")
                return patch

        return 'No patch information available'
    except Exception as e:
        logging.error(f"Error retrieving patch info: {e}")
        return 'No patch information available'

def main():
    # Fetch vulnerabilities and patches dynamically from the API
    document_id = 'your_document_id_here'  # Replace with actual document ID
    vulnerabilities = fetch_vulnerabilities_from_api(document_id)
    if vulnerabilities is None:
        print("Unable to retrieve vulnerability information. Please check the logs for more details.")
        return

    
    os_info = get_os_details()

    # Print OS details
    print("Operating System Details:")
    for key, value in os_info.items():
        print(f"{key}: {value}")

    # Log OS details
    logging.info("Operating System Details:")
    for key, value in os_info.items():
        logging.info(f"{key}: {value}")

    # Check for vulnerability
    if check_vulnerability(os_info, vulnerabilities):
        result = "The system is running a vulnerable version."
        patch_info = get_patch_info(os_info, vulnerabilities)
        result += f" Suggested patch: {patch_info}"
    else:
        result = "The system is not running a vulnerable version."

    print(result)

    # Log result
    logging.info(result)

if __name__ == "__main__":
    main()
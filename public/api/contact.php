<?php
/**
 * Frostrek AI — Resend API Contact & Audit Form Handler for Production
 * 
 * Handles POST requests from:
 * 1. ContactPage.tsx (/contact)
 * 2. AuditPage.tsx (/audit)
 * 
 * Sends styled HTML notification emails directly via Resend REST API (https://api.resend.com/emails)
 * to contact@frostrek.com.
 */

// Handle CORS for local testing & development if needed
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "error" => "Method not allowed. Only POST is accepted."]);
    exit();
}

// Resend API Configuration
// Load secret API key from gitignored config.php or environment variable
$resendApiKey = getenv('RESEND_API_KEY') ?: '';
if (file_exists(__DIR__ . '/config.php')) {
    $config = require __DIR__ . '/config.php';
    if (is_array($config) && isset($config['resend_api_key'])) {
        $resendApiKey = $config['resend_api_key'];
    }
}
$recipientEmail = 'contact@frostrek.com';
$senderEmail = 'Frostrek AI Portal <contact@frostrek.com>';

// Read JSON input from request body
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Invalid JSON payload received."]);
    exit();
}

$source = trim($data['source'] ?? '');
$isAudit = ($source === 'SEO_GEO_AEO_FREE_AUDIT') || !empty($data['website_url']) || !empty($data['target_market']);

// Extract common and audit-specific fields
$contactName = trim($data['contact_name'] ?? '');
$firstName = trim($data['firstName'] ?? '');
$lastName = trim($data['lastName'] ?? '');

// If single contact_name was sent, extract first and last name
if (empty($firstName) && !empty($contactName)) {
    $parts = preg_split('/\s+/', $contactName, 2);
    $firstName = $parts[0] ?? '';
    $lastName = $parts[1] ?? '';
}

// Full name fallback
$fullName = trim($firstName . ' ' . $lastName);
if (empty($fullName)) {
    $fullName = !empty($contactName) ? $contactName : (!empty($firstName) ? $firstName : 'Visitor');
}

$workEmail = trim($data['workEmail'] ?? $data['business_email'] ?? $data['email'] ?? '');
$company = trim($data['company'] ?? $data['business_name'] ?? 'N/A');
$businessName = trim($data['business_name'] ?? $data['company'] ?? '');
$websiteUrl = trim($data['website_url'] ?? '');
$targetMarket = trim($data['target_market'] ?? 'N/A');
$businessType = trim($data['business_type'] ?? 'N/A');
$topPriority = trim($data['top_priority'] ?? 'N/A');
$topCompetitors = trim($data['top_competitors'] ?? 'None specified');
$jobTitle = trim($data['jobTitle'] ?? 'N/A');
$reachType = trim($data['reachType'] ?? ($isAudit ? 'SEO & AI Visibility Audit' : 'Sales Enquiry'));
$projectDetails = trim($data['projectDetails'] ?? '');

// Validate email address
if (empty($workEmail) || !filter_var($workEmail, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "A valid work or business email address is required."]);
    exit();
}

// Validate required fields based on form type
if ($isAudit) {
    if (empty($firstName) && empty($contactName)) {
        http_response_code(400);
        echo json_encode(["success" => false, "error" => "Contact name is required."]);
        exit();
    }
    if (empty($websiteUrl) && empty($businessName) && empty($projectDetails)) {
        http_response_code(400);
        echo json_encode(["success" => false, "error" => "Website URL or Business Name is required."]);
        exit();
    }
} else {
    if (empty($firstName) || empty($projectDetails)) {
        http_response_code(400);
        echo json_encode(["success" => false, "error" => "Required fields are missing."]);
        exit();
    }
}

// Sanitize inputs for safe HTML email rendering
$safeFullName = htmlspecialchars($fullName, ENT_QUOTES, 'UTF-8');
$safeFirstName = htmlspecialchars($firstName, ENT_QUOTES, 'UTF-8');
$safeLastName = htmlspecialchars($lastName, ENT_QUOTES, 'UTF-8');
$safeCompany = htmlspecialchars($company, ENT_QUOTES, 'UTF-8');
$safeBusinessName = htmlspecialchars($businessName ?: $company, ENT_QUOTES, 'UTF-8');
$safeWebsiteUrl = htmlspecialchars($websiteUrl, ENT_QUOTES, 'UTF-8');
$safeTargetMarket = htmlspecialchars($targetMarket, ENT_QUOTES, 'UTF-8');
$safeBusinessType = htmlspecialchars($businessType, ENT_QUOTES, 'UTF-8');
$safeTopPriority = htmlspecialchars($topPriority, ENT_QUOTES, 'UTF-8');
$safeTopCompetitors = nl2br(htmlspecialchars($topCompetitors, ENT_QUOTES, 'UTF-8'));
$safeJobTitle = htmlspecialchars($jobTitle, ENT_QUOTES, 'UTF-8');
$safeWorkEmail = htmlspecialchars($workEmail, ENT_QUOTES, 'UTF-8');
$safeReachType = htmlspecialchars($reachType, ENT_QUOTES, 'UTF-8');
$safeProjectDetails = nl2br(htmlspecialchars($projectDetails, ENT_QUOTES, 'UTF-8'));

if ($isAudit) {
    $emailSubject = "New Audit Request: " . ($businessName ?: $safeFullName) . (!empty($websiteUrl) ? " ({$websiteUrl})" : "");
    $mailtoSubject = rawurlencode("Re: Free SEO & AI Visibility Audit - " . ($businessName ?: $fullName));

    $htmlTemplate = <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>New SEO &amp; AI Visibility Audit Request</title>
</head>
<body style="margin: 0; padding: 28px 24px; background-color: #FFFFFF; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1E293B;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FFFFFF; width: 100%; max-width: 680px; margin: 0 auto;">
        <!-- Header Title -->
        <tr>
            <td style="padding-bottom: 18px; border-bottom: 2px solid #2D6A4F; width: 100%;">
                <h1 style="margin: 0; color: #2D6A4F; font-size: 24px; font-weight: 700; font-family: 'Playfair Display', Georgia, serif; letter-spacing: -0.01em;">
                    New SEO &amp; AI Visibility Audit Request
                </h1>
            </td>
        </tr>

        <!-- Subtitle -->
        <tr>
            <td style="padding: 20px 0 16px; border-bottom: 1px solid #E2E8F0; width: 100%;">
                <p style="margin: 0; font-size: 15px; color: #334155;">
                    A prospect has requested a <strong>Free Preliminary SEO &amp; AI Visibility Audit</strong> from <a href="https://www.frostrek.ai/audit" style="color: #2D6A4F; text-decoration: none;">/audit</a>.
                </p>
            </td>
        </tr>

        <!-- Details Table -->
        <tr>
            <td style="padding: 0; width: 100%;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 14px; line-height: 1.6; width: 100%;">
                    <!-- Business / Company -->
                    <tr>
                        <td width="150" valign="top" style="padding: 14px 0; color: #475569; font-weight: 700; border-bottom: 1px solid #F1F5F9;">Company / Business:</td>
                        <td style="padding: 14px 0; color: #0F172A; font-weight: 600; border-bottom: 1px solid #F1F5F9;">{$safeBusinessName}</td>
                    </tr>
                    <!-- Website URL -->
                    <tr>
                        <td width="150" valign="top" style="padding: 14px 0; color: #475569; font-weight: 700; border-bottom: 1px solid #F1F5F9;">Website URL:</td>
                        <td style="padding: 14px 0; border-bottom: 1px solid #F1F5F9;">
                            <a href="{$safeWebsiteUrl}" target="_blank" style="color: #2D6A4F; font-weight: 600; text-decoration: underline;">{$safeWebsiteUrl}</a>
                        </td>
                    </tr>
                    <!-- Contact Person -->
                    <tr>
                        <td width="150" valign="top" style="padding: 14px 0; color: #475569; font-weight: 700; border-bottom: 1px solid #F1F5F9;">Contact Person:</td>
                        <td style="padding: 14px 0; color: #0F172A; font-weight: 600; border-bottom: 1px solid #F1F5F9;">{$safeFullName}</td>
                    </tr>
                    <!-- Email -->
                    <tr>
                        <td width="150" valign="top" style="padding: 14px 0; color: #475569; font-weight: 700; border-bottom: 1px solid #F1F5F9;">Business Email:</td>
                        <td style="padding: 14px 0; border-bottom: 1px solid #F1F5F9;">
                            <a href="mailto:{$safeWorkEmail}" style="color: #2D6A4F; font-weight: 600; text-decoration: none;">{$safeWorkEmail}</a>
                        </td>
                    </tr>
                    <!-- Target Market -->
                    <tr>
                        <td width="150" valign="top" style="padding: 14px 0; color: #475569; font-weight: 700; border-bottom: 1px solid #F1F5F9;">Target Market:</td>
                        <td style="padding: 14px 0; color: #0F172A; border-bottom: 1px solid #F1F5F9;">{$safeTargetMarket}</td>
                    </tr>
                    <!-- Business Category -->
                    <tr>
                        <td width="150" valign="top" style="padding: 14px 0; color: #475569; font-weight: 700; border-bottom: 1px solid #F1F5F9;">Business Category:</td>
                        <td style="padding: 14px 0; color: #0F172A; border-bottom: 1px solid #F1F5F9;">{$safeBusinessType}</td>
                    </tr>
                    <!-- Top Priority Focus -->
                    <tr>
                        <td width="150" valign="top" style="padding: 14px 0; color: #475569; font-weight: 700; border-bottom: 1px solid #F1F5F9;">Top Priority Focus:</td>
                        <td style="padding: 14px 0; color: #0F172A; font-weight: 600; border-bottom: 1px solid #F1F5F9;">{$safeTopPriority}</td>
                    </tr>
                    <!-- Top Competitors -->
                    <tr>
                        <td width="150" valign="top" style="padding: 14px 0; color: #475569; font-weight: 700; border-bottom: 1px solid #F1F5F9;">Top Competitors:</td>
                        <td style="padding: 14px 0; color: #334155; border-bottom: 1px solid #F1F5F9;">{$safeTopCompetitors}</td>
                    </tr>
                    <!-- Full Summary -->
                    <tr>
                        <td width="150" valign="top" style="padding: 20px 0; color: #475569; font-weight: 700;">Audit Summary:</td>
                        <td style="padding: 20px 0;">
                            <div style="background-color: #FAFCFB; border: 1px solid #E2E8F0; border-left: 4px solid #2D6A4F; border-radius: 8px; padding: 16px; color: #1E293B; font-size: 13px; line-height: 1.6; white-space: pre-wrap; width: 100%; box-sizing: border-box;">{$safeProjectDetails}</div>
                        </td>
                    </tr>
                    <!-- Action Button -->
                    <tr>
                        <td colspan="2" align="center" style="padding: 30px 0 10px;">
                            <a href="mailto:{$safeWorkEmail}?subject={$mailtoSubject}" style="display: inline-block; background-color: #2D6A4F; color: #FFFFFF; font-weight: 600; font-size: 15px; text-decoration: none; padding: 14px 32px; border-radius: 9999px; box-shadow: 0 4px 6px -1px rgba(45, 106, 79, 0.25);">
                                Reply Directly to {$safeFirstName} &rarr;
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
HTML;
} else {
    $emailSubject = "New Contact Inquiry: {$safeReachType} - {$safeFullName}";
    $mailtoSubject = rawurlencode("Re: New Contact Inquiry: " . $reachType);

    $htmlTemplate = <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>New Message from Frostrek Website</title>
</head>
<body style="margin: 0; padding: 28px 24px; background-color: #FFFFFF; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1E293B;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FFFFFF; width: 100%; max-width: 680px; margin: 0 auto;">
        <!-- Header Title -->
        <tr>
            <td style="padding-bottom: 18px; border-bottom: 2px solid #2D6A4F; width: 100%;">
                <h1 style="margin: 0; color: #2D6A4F; font-size: 24px; font-weight: 700; font-family: 'Playfair Display', Georgia, serif; letter-spacing: -0.01em;">
                    New Message from Frostrek Website
                </h1>
            </td>
        </tr>

        <!-- Subtitle -->
        <tr>
            <td style="padding: 20px 0 16px; border-bottom: 1px solid #E2E8F0; width: 100%;">
                <p style="margin: 0; font-size: 15px; color: #334155;">
                    You have received a new inquiry via the Contact Form.
                </p>
            </td>
        </tr>

        <!-- Details Table -->
        <tr>
            <td style="padding: 0; width: 100%;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 14px; line-height: 1.6; width: 100%;">
                    <!-- Name -->
                    <tr>
                        <td width="140" valign="top" style="padding: 16px 0; color: #475569; font-weight: 700; border-bottom: 1px solid #F1F5F9;">Name:</td>
                        <td style="padding: 16px 0; color: #0F172A; font-weight: 600; border-bottom: 1px solid #F1F5F9;">{$safeFullName}</td>
                    </tr>
                    <!-- Email -->
                    <tr>
                        <td width="140" valign="top" style="padding: 16px 0; color: #475569; font-weight: 700; border-bottom: 1px solid #F1F5F9;">Email:</td>
                        <td style="padding: 16px 0; border-bottom: 1px solid #F1F5F9;">
                            <a href="mailto:{$safeWorkEmail}" style="color: #2D6A4F; font-weight: 600; text-decoration: none;">{$safeWorkEmail}</a>
                        </td>
                    </tr>
                    <!-- Company -->
                    <tr>
                        <td width="140" valign="top" style="padding: 16px 0; color: #475569; font-weight: 700; border-bottom: 1px solid #F1F5F9;">Company:</td>
                        <td style="padding: 16px 0; color: #0F172A; border-bottom: 1px solid #F1F5F9;">{$safeCompany}</td>
                    </tr>
                    <!-- Job Title -->
                    <tr>
                        <td width="140" valign="top" style="padding: 16px 0; color: #475569; font-weight: 700; border-bottom: 1px solid #F1F5F9;">Job Title:</td>
                        <td style="padding: 16px 0; color: #0F172A; border-bottom: 1px solid #F1F5F9;">{$safeJobTitle}</td>
                    </tr>
                    <!-- Subject -->
                    <tr>
                        <td width="140" valign="top" style="padding: 16px 0; color: #475569; font-weight: 700; border-bottom: 1px solid #F1F5F9;">Subject:</td>
                        <td style="padding: 16px 0; color: #0F172A; border-bottom: 1px solid #F1F5F9;">New Contact Inquiry: {$safeReachType}</td>
                    </tr>
                    <!-- Message -->
                    <tr>
                        <td width="140" valign="top" style="padding: 22px 0; color: #475569; font-weight: 700;">Message:</td>
                        <td style="padding: 22px 0;">
                            <div style="background-color: #FAFCFB; border: 1px solid #E2E8F0; border-left: 4px solid #2D6A4F; border-radius: 8px; padding: 18px; color: #1E293B; font-size: 14px; line-height: 1.6; white-space: pre-wrap; width: 100%; box-sizing: border-box;">{$safeProjectDetails}</div>
                        </td>
                    </tr>
                    <!-- Reply Directly To Button -->
                    <tr>
                        <td colspan="2" align="center" style="padding: 36px 0 20px;">
                            <a href="mailto:{$safeWorkEmail}?subject={$mailtoSubject}" style="display: inline-block; background-color: #2D6A4F; color: #FFFFFF; font-weight: 600; font-size: 15px; text-decoration: none; padding: 14px 32px; border-radius: 9999px; box-shadow: 0 4px 6px -1px rgba(45, 106, 79, 0.25);">
                                Reply Directly to &rarr;
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
HTML;
}

// Prepare payload for Resend REST API
$postData = [
    "from" => $senderEmail,
    "to" => [$recipientEmail],
    "reply_to" => $workEmail,
    "subject" => $emailSubject,
    "html" => $htmlTemplate
];

// Execute cURL request to Resend
$ch = curl_init('https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $resendApiKey,
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$httpStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

// Check Resend response
if ($curlError) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "cURL error while calling Resend: " . $curlError]);
    exit();
}

$responseData = json_decode($response, true);

if ($httpStatus >= 200 && $httpStatus < 300) {
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Message sent successfully.",
        "id" => $responseData['id'] ?? null
    ]);
} else {
    http_response_code($httpStatus);
    $errorMsg = $responseData['message'] ?? 'Failed to send email via Resend API.';
    echo json_encode([
        "success" => false,
        "error" => $errorMsg,
        "details" => $responseData
    ]);
}

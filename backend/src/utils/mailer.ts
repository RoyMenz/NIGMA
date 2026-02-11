import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';
import { env } from '../env.js';

const resend = new Resend(env.RESEND_API_KEY);

export async function sendHackathonEmail(
  to: string,
  teamName: string,
  registrationId: number
) {
  const templatePath = path.join(
    process.cwd(),
    'src',
    'assets',
    'RagnoCode_ppt_template.pptx'
  );

  const fileBuffer = fs.readFileSync(templatePath);

  await resend.emails.send({
    from: 'RagnoCode 2026 <developers@nigmafest.in>',
    to,
    subject: 'RagnoCode 2026 – Round 1 Submission Guidelines',
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #222;">
      
      <h2>RagnoCode 2026 – Round 1 Submission Guidelines</h2>

      <p>Dear Team <strong>${teamName}</strong>,</p>

      <p>
        Greetings from the <strong>RagnoCode Organizing Team</strong>!
      </p>

      <p>
        Your registration for <strong>RagnoCode 2026</strong> has been successfully received.
        We’re excited to have you onboard for <strong>Round 1</strong> of the hackathon.
      </p>

      <hr/>

      <h3>🔹 Round 1 – Online Ideation Submission</h3>

      <p>
        To confirm your participation, your team must submit your presentation in <strong>PDF format</strong> on or before:
      </p>

      <p>
        📅 <strong>21st February 2026</strong><br/>
        ⏰ Late submissions will not be accepted.
      </p>

      <p>📩 Send your PPT (PDF) to:</p>
      <p>
        prarthana.23bc063@student.nitte.edu.in<br/>
        royston.23bc078@student.nitte.edu.in
      </p>

      <hr/>

      <h3>📌 What You Need to Do</h3>
      <ul>
        <li>Choose a problem statement under your selected track.</li>
        <li>Use the official PPT template attached to this email.</li>
        <li>Clearly present your problem statement, proposed solution, feasibility, and expected impact.</li>
      </ul>

      <hr/>

      <h3>📑 Presentation Structure (Maximum 6 Slides)</h3>

      <p><strong>1. Title Slide</strong><br/>
      Project Title, Team Name, Team Leader’s Name, Email ID, Contact Number</p>

      <p><strong>2. Problem Statement</strong><br/>
      (Based on selected track)</p>

      <p><strong>3. Proposed Solution</strong></p>

      <p><strong>4. Technology Stack & Approach</strong></p>

      <hr/>

      <h3>🏆 Evaluation Criteria</h3>
      <ul>
        <li>Innovation</li>
        <li>Feasibility</li>
        <li>Impact Potential</li>
      </ul>

      <p>
        📢 Shortlisted teams will be announced on <strong>23rd February 2026</strong>
        via email or direct contact.
      </p>

      <hr/>

      <h3>⚠ Important Instructions</h3>
      <ul>
        <li>This is an ideation round only – no prototype or code submission is required.</li>
        <li>Only one final submission per team will be considered.</li>
        <li>Plagiarism will lead to immediate disqualification.</li>
        <li>Failure to submit within the deadline will result in registration being considered invalid.</li>
      </ul>

      <p>
        We look forward to your innovative ideas and impactful solutions.
      </p>

      <br/>

      <p>
        Best Regards,<br/>
        <strong>Organizing Committee</strong><br/>
        RagnoCode 2026
      </p>
    </div>
  `,
    attachments: [
      {
        filename: 'RagnoCode_PPT_Template.pptx',
        content: fileBuffer,
      },
    ],
  });
}

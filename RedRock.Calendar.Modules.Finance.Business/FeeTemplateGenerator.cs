using RedRock.Calendar.Modules.Finance.Contract;
using RedRock.Calendar.Modules.Users.Contract;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;

namespace RedRock.Calendar.Modules.Finance.Business
{
    public static class FeeTemplateGenerator
    {
        public static string GetHTMLString(IEnumerable<FinanceDTO> financeDTOs, IEnumerable<UserDTO> users)
        {
            var sb = new StringBuilder();
            sb.Append(@"
                        <html>
                            <head>
                            </head>
                            <body>
                                <div class='header'><h1>This is the generated PDF report!!!</h1></div>
                                <table>");
            var overall = 0;
            foreach (var finance in financeDTOs)
            {
                var userName = GetUserNameById(finance.UserReference, users);
                var monthName = new DateTime(2010, finance.Month, 1)
                                        .ToString("MMM", CultureInfo.InvariantCulture);
                overall += finance.Sum;
                sb.AppendFormat(@"
                                    <tr><td class='with-border'>{0}</td></tr>
                                    <tr><td>Month: {1}</td></tr>
                                    <tr><td>{2}x{3} RON</td></tr>
                                    <tr><td>Total {4} RON</td></tr>
                                  ", userName, monthName, finance.EventsNumber, finance.Price, finance.Sum);
            }
            sb.AppendFormat(@"
                                </table>
                                <hr/>
                                Overall {0} RON
                            </body>
                        </html>",overall);
            return sb.ToString();
        }

        private static string GetUserNameById(Guid id, IEnumerable<UserDTO> users)
        {
            foreach (var user in users)
            {
                if (user.Id.Equals(id)) return user.FullName;
            }
            return null;
        }
    }
}

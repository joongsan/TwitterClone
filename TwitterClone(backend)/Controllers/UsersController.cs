using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;
using TwitterClone.Models.User;


namespace TwitterClone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public UsersController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public string Get()
        {
            string query = @"
                        SELECT UserId ,UserName ,FirstName ,LastName , isAdmin FROM dbo.[User]
                        ";
            var dt = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SQLConnection");

            SqlDataReader sqlReader;
            using (SqlConnection sqlCon = new SqlConnection(sqlDataSource))
            {
                sqlCon.Open();
                using (SqlCommand sqlCommand = new SqlCommand(query, sqlCon))
                {
                    sqlReader = sqlCommand.ExecuteReader();
                    dt.Load(sqlReader);
                    sqlReader.Close();
                    sqlCon.Close();
                }
            }
            var json = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return json;

        }

        [HttpPost]
        public JsonResult Post(User user)
        {
            string query = @"
                        INSERT INTO dbo.[User]
                        VALUES (NEWID(), @UserName, @FirstName, @LastName, 0)
                        ";
            var dt = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SQLConnection");

            SqlDataReader sqlReader;
            using (SqlConnection sqlCon = new SqlConnection(sqlDataSource))
            {
                sqlCon.Open();
                using (SqlCommand sqlCommand = new SqlCommand(query, sqlCon))
                {
                    sqlCommand.Parameters.AddWithValue("@UserName", user.UserName);
                    sqlCommand.Parameters.AddWithValue("@FirstName", user.FirstName);
                    sqlCommand.Parameters.AddWithValue("@LastName", user.LastName);
                    sqlReader = sqlCommand.ExecuteReader();
                    dt.Load(sqlReader);
                    sqlReader.Close();
                    sqlCon.Close();
                }
            }

            return new JsonResult("Created Successfully");

        }

        [HttpPut]
        public JsonResult Put(User user)
        {
            string query = @"
                        UPDATE dbo.[User]
                        SET UserName = @UserName
                            ,FirstName = @FirstName
                            ,LastName = @LastName
                        WHERE UserId = @UserId
                        ";
            var dt = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SQLConnection");

            SqlDataReader sqlReader;
            using (SqlConnection sqlCon = new SqlConnection(sqlDataSource))
            {
                sqlCon.Open();
                using (SqlCommand sqlCommand = new SqlCommand(query, sqlCon))
                {
                    sqlCommand.Parameters.AddWithValue("@UserId", user.UserId);
                    sqlCommand.Parameters.AddWithValue("@UserName", user.UserName);
                    sqlCommand.Parameters.AddWithValue("@FirstName", user.FirstName);
                    sqlCommand.Parameters.AddWithValue("@LastName", user.LastName);
                    sqlReader = sqlCommand.ExecuteReader();
                    dt.Load(sqlReader);
                    sqlReader.Close();
                    sqlCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");

        }

        [HttpDelete("{userId}")]
        public JsonResult Delete(Guid userId)
        {
            string query = @"
                        DELETE FROM dbo.[User]
                        WHERE UserId = @UserId
                        ";
            var dt = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SQLConnection");

            SqlDataReader sqlReader;
            using (SqlConnection sqlCon = new SqlConnection(sqlDataSource))
            {
                sqlCon.Open();
                using (SqlCommand sqlCommand = new SqlCommand(query, sqlCon))
                {
                    sqlCommand.Parameters.AddWithValue("@UserId", userId);
                    sqlReader = sqlCommand.ExecuteReader();
                    dt.Load(sqlReader);
                    sqlReader.Close();
                    sqlCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");

        }
    }
}


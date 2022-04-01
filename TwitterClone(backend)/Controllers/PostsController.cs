using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;
using TwitterClone.Models.Posts;

namespace TwitterClone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public PostsController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public string Get()
        {
            string query = @"
                            SELECT PostsId ,PostTitle ,PostBody ,UserId ,DateCreated ,PostImage FROM dbo.Posts
                            ";
            var dt = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SQLConnection");
            
            SqlDataReader sqlReader;
            using(SqlConnection sqlCon = new SqlConnection(sqlDataSource))
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
        public JsonResult Post(Posts posts)
        {
            string query = @"
                            INSERT INTO dbo.Posts
                            VALUES (NEWID(), @PostTitle, @PostBody, @UserId, @DateCreated, @PostImage)
                            ";
            var dt = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SQLConnection");

            SqlDataReader sqlReader;
            using (SqlConnection sqlCon = new SqlConnection(sqlDataSource))
            {
                sqlCon.Open();
                using (SqlCommand sqlCommand = new SqlCommand(query, sqlCon))
                {
                    sqlCommand.Parameters.AddWithValue("@PostTitle", posts.PostTitle);
                    sqlCommand.Parameters.AddWithValue("@PostBody", posts.PostBody);
                    sqlCommand.Parameters.AddWithValue("@UserId", posts.UserId);
                    sqlCommand.Parameters.AddWithValue("@DateCreated", posts.DateCreated);
                    sqlCommand.Parameters.AddWithValue("@PostImage", posts.PostImage);
                    sqlReader = sqlCommand.ExecuteReader();
                    dt.Load(sqlReader);
                    sqlReader.Close();
                    sqlCon.Close();
                }
            }

            return new JsonResult("Created Successfully");

        }

        [HttpPut]
        public JsonResult Put(Posts posts)
        {
            string query = @"
                            UPDATE dbo.Posts
                            SET PostTitle = @PostTitle, PostBody = @PostBody, UserId = @UserId, PostImage = @PostImage
                            WHERE PostsId = @PostsId
                            ";
            var dt = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SQLConnection");

            SqlDataReader sqlReader;
            using (SqlConnection sqlCon = new SqlConnection(sqlDataSource))
            {
                sqlCon.Open();
                using (SqlCommand sqlCommand = new SqlCommand(query, sqlCon))
                {
                    sqlCommand.Parameters.AddWithValue("@PostsId", posts.PostsId);
                    sqlCommand.Parameters.AddWithValue("@PostTitle", posts.PostTitle);
                    sqlCommand.Parameters.AddWithValue("@PostBody", posts.PostBody);
                    sqlCommand.Parameters.AddWithValue("@UserId", posts.UserId);
                    sqlCommand.Parameters.AddWithValue("@PostImage", posts.PostImage);
                    sqlReader = sqlCommand.ExecuteReader();
                    dt.Load(sqlReader);
                    sqlReader.Close();
                    sqlCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");

        }

        [HttpDelete("{postsId}")]
        public JsonResult Delete(Guid postsId)
        {
            string query = @"
                            DELETE FROM dbo.Posts
                            WHERE PostsId = @PostId
                            ";
            var dt = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SQLConnection");

            SqlDataReader sqlReader;
            using (SqlConnection sqlCon = new SqlConnection(sqlDataSource))
            {
                sqlCon.Open();
                using (SqlCommand sqlCommand = new SqlCommand(query, sqlCon))
                {
                    sqlCommand.Parameters.AddWithValue("@PostId", postsId);
                    sqlReader = sqlCommand.ExecuteReader();
                    dt.Load(sqlReader);
                    sqlReader.Close();
                    sqlCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");

        }

        [Route("UploadFile")]
        [HttpPost]

        public JsonResult UploadFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                var fileName = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Images/" + fileName;

                using( var fs = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(fs);
                }

                return new JsonResult(fileName);
            }
            catch (Exception)
            {
                return new JsonResult("failedImage.png");
            }
        }
    }
}
